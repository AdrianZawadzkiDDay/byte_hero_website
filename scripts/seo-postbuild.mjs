#!/usr/bin/env node
/**
 * Krok po `ng build` (npm uruchamia go automatycznie jako `postbuild`):
 *
 *  1. Audyt SEO każdej prerenderowanej podstrony. Gdy czegoś brakuje (tytuł, opis,
 *     canonical, hreflang, dane strukturalne, treść w HTML-u, martwy link), build
 *     kończy się błędem, więc wadliwa wersja nie trafi na produkcję.
 *  2. `sitemap.xml` z odpowiednikami językowymi oraz `robots.txt`.
 *  3. `404.html` – hosting statyczny zwraca ją z kodem HTTP 404 dla nieznanych adresów.
 *
 * Jedynym źródłem prawdy jest wygenerowany HTML: adresy pochodzą z jego znaczników
 * canonical i hreflang, więc mapa strony zawsze zgadza się z tym, co deklarują podstrony.
 */
import { execSync } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'dist/byte-hero-website/browser');
const NOT_FOUND_ROUTES = new Set(['/404', '/en/404']);
// Roboty wyszukiwarek i asystentów AI, którym jawnie pozwalamy czytać stronę.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

if (!existsSync(join(outDir, 'index.html'))) {
  console.error(`Brak builda w ${relative(root, outDir)} – uruchom najpierw "ng build".`);
  process.exit(1);
}

const problems = [];
const warnings = [];

// ---------- odczyt stron ----------

function findPages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      return findPages(path);
    }
    return name === 'index.html' ? [path] : [];
  });
}

const decode = (value) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return match ? decode(match[1]) : undefined;
};

function readPage(file) {
  const html = readFileSync(file, 'utf8');
  const headEnd = html.indexOf('</head>');
  const head = html.slice(0, headEnd);
  const body = html.slice(headEnd);
  const tags = (name) => head.match(new RegExp(`<${name}\\b[^>]*>`, 'g')) ?? [];
  const links = tags('link');
  const metas = tags('meta');
  const meta = (key, value) => {
    const tag = metas.find((candidate) => attr(candidate, key) === value);
    return tag ? attr(tag, 'content') : undefined;
  };

  const dir = relative(outDir, dirname(file)).split(sep).join('/');
  const main = (body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/) ?? [])[1] ?? '';
  const text = decode(
    main
      .replace(/<(script|style)\b[\s\S]*?<\/\1>|<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );

  return {
    file,
    route: dir === '' ? '/' : `/${dir}`,
    lang: (html.match(/<html\b[^>]*\slang="([^"]+)"/) ?? [])[1],
    title: decode((head.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? ''),
    description: meta('name', 'description') ?? '',
    robots: meta('name', 'robots') ?? '',
    canonical: attr(links.find((link) => attr(link, 'rel') === 'canonical') ?? '', 'href'),
    alternates: Object.fromEntries(
      links
        .filter((link) => attr(link, 'rel') === 'alternate' && attr(link, 'hreflang'))
        .map((link) => [attr(link, 'hreflang'), attr(link, 'href')]),
    ),
    ogImage: meta('property', 'og:image'),
    ogUrl: meta('property', 'og:url'),
    h1Count: (body.match(/<h1[\s>]/g) ?? []).length,
    jsonLd: [
      ...html.matchAll(/<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g),
    ].map((match) => match[1]),
    text,
    internalLinks: [...body.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)]
      .map((match) => decode(match[1]))
      .filter((href) => href.startsWith('/') && !href.startsWith('//'))
      .map((href) => href.split(/[?#]/)[0]),
  };
}

const pages = findPages(outDir).map(readPage);
const indexable = pages.filter((page) => !NOT_FOUND_ROUTES.has(page.route));
const byRoute = new Map(pages.map((page) => [page.route, page]));
const byCanonical = new Map(indexable.map((page) => [page.canonical, page]));

const home = byRoute.get('/');
if (!home?.canonical) {
  console.error('Strona główna nie ma znacznika canonical – nie da się ustalić adresu witryny.');
  process.exit(1);
}
const origin = new URL(home.canonical).origin;
const expectedUrl = (route) => (route === '/' ? `${origin}/` : `${origin}${route}`);
const fileExists = (path) => {
  const file = join(outDir, path);
  return existsSync(file) && statSync(file).isFile();
};

// ---------- audyt ----------

for (const page of pages) {
  const fail = (message) => problems.push(`${page.route}: ${message}`);
  const warn = (message) => warnings.push(`${page.route}: ${message}`);

  if (!page.lang) fail('brak atrybutu lang w <html>');
  if (!page.title) fail('pusty <title>');
  if (page.h1Count !== 1) fail(`oczekiwano jednego <h1>, jest ${page.h1Count}`);
  if (page.text.length < 60) fail('treść nie została wyrenderowana do HTML-a (pusty <main>)');
  if (!page.ogImage) {
    fail('brak og:image');
  } else if (!fileExists(new URL(page.ogImage).pathname)) {
    fail(`og:image wskazuje nieistniejący plik: ${page.ogImage}`);
  }
  for (const href of new Set(page.internalLinks)) {
    if (!byRoute.has(href === '/' ? '/' : href.replace(/\/$/, '')) && !fileExists(href)) {
      fail(`martwy link wewnętrzny: ${href}`);
    }
  }

  if (NOT_FOUND_ROUTES.has(page.route)) {
    if (!page.robots.includes('noindex')) fail('strona 404 musi mieć robots noindex');
    if (page.canonical) fail('strona 404 nie powinna mieć canonical');
    continue;
  }

  if (page.robots.includes('noindex')) fail('strona oznaczona jako noindex');
  if (page.title.length > 65) warn(`długi tytuł (${page.title.length} znaków)`);
  if (page.description.length < 70 || page.description.length > 165) {
    fail(`opis ma ${page.description.length} znaków (zalecane 70–165)`);
  }
  if (page.canonical !== expectedUrl(page.route)) {
    fail(`canonical "${page.canonical}" ≠ oczekiwany "${expectedUrl(page.route)}"`);
  }
  if (page.ogUrl !== page.canonical) fail('og:url różni się od canonical');

  // hreflang: komplet wersji, wskazanie na siebie i wzajemność
  for (const lang of ['pl', 'en', 'x-default']) {
    if (!page.alternates[lang]) fail(`brak hreflang="${lang}"`);
  }
  if (page.alternates[page.lang] !== page.canonical) {
    fail(`hreflang="${page.lang}" nie wskazuje na tę stronę`);
  }
  for (const lang of ['pl', 'en']) {
    const other = byCanonical.get(page.alternates[lang]);
    if (!other) {
      fail(`hreflang="${lang}" wskazuje nieistniejącą stronę: ${page.alternates[lang]}`);
    } else if (JSON.stringify(other.alternates) !== JSON.stringify(page.alternates)) {
      fail(`hreflang nie jest wzajemny z ${other.route}`);
    }
  }

  // dane strukturalne
  if (page.jsonLd.length !== 1) {
    fail(`oczekiwano jednego bloku JSON-LD, jest ${page.jsonLd.length}`);
    continue;
  }
  let graph;
  try {
    graph = JSON.parse(page.jsonLd[0])['@graph'];
  } catch (error) {
    fail(`niepoprawny JSON-LD: ${error.message}`);
    continue;
  }
  const types = graph.flatMap((node) => node['@type']);
  page.schemaTypes = types;
  for (const required of ['Organization', 'WebSite']) {
    if (!types.includes(required)) fail(`JSON-LD bez ${required}`);
  }
  if (!graph.some((node) => node.url === page.canonical)) fail('JSON-LD bez węzła tej strony');
  const faq = graph.find((node) => node['@type'] === 'FAQPage');
  for (const question of faq?.mainEntity ?? []) {
    // Wytyczne Google: pytania i odpowiedzi ze znaczników muszą być widoczne na stronie.
    if (!page.text.includes(question.name) || !page.text.includes(question.acceptedAnswer.text)) {
      fail(`pytanie FAQ z JSON-LD nie jest widoczne w treści: "${question.name}"`);
    }
  }
}

for (const lang of ['pl', 'en']) {
  const inLang = indexable.filter((page) => page.lang === lang);
  for (const field of ['title', 'description']) {
    const seen = new Map();
    for (const page of inLang) {
      if (seen.has(page[field])) {
        problems.push(`${page.route}: ${field} taki sam jak na ${seen.get(page[field])}`);
      }
      seen.set(page[field], page.route);
    }
  }
}

// llms.txt: każdy link do tej witryny musi prowadzić do istniejącej podstrony
const llmsFile = join(outDir, 'llms.txt');
if (existsSync(llmsFile)) {
  const urls = readFileSync(llmsFile, 'utf8').match(/\]\((https?:\/\/[^)\s]+)\)/g) ?? [];
  for (const url of urls
    .map((link) => link.slice(2, -1))
    .filter((link) => link.startsWith(origin))) {
    if (!byCanonical.has(url)) problems.push(`llms.txt: link do nieistniejącej podstrony ${url}`);
  }
} else {
  warnings.push('brak pliku llms.txt');
}

// ---------- raport ----------

console.log(`\nAudyt SEO – ${origin} (${indexable.length} podstron do indeksowania)\n`);
console.log('  język  tytuł  opis  słowa  dane strukturalne                          adres');
for (const page of [...indexable].sort((a, b) => a.route.localeCompare(b.route))) {
  const types = [...new Set(page.schemaTypes ?? [])]
    .filter((type) => !['Organization', 'WebSite', 'ImageObject'].includes(type))
    .join(', ');
  console.log(
    `  ${page.lang.padEnd(5)}  ${String(page.title.length).padStart(5)}  ${String(page.description.length).padStart(4)}  ` +
      `${String(page.text.split(' ').length).padStart(5)}  ${types.padEnd(42)} ${page.route}`,
  );
}
for (const warning of warnings) console.log(`\n  uwaga: ${warning}`);

if (problems.length > 0) {
  console.error(`\nAudyt SEO nie przeszedł (${problems.length}):`);
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  process.exit(1);
}

// ---------- sitemap.xml ----------

let lastmod = new Date().toISOString().slice(0, 10);
try {
  lastmod =
    execSync('git log -1 --format=%cs', { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim() || lastmod;
} catch {
  // brak gita (np. build z archiwum) – zostaje dzisiejsza data
}

const xml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const sitemapEntries = [...indexable]
  .sort((a, b) => a.canonical.localeCompare(b.canonical))
  .map((page) => {
    const alternates = Object.entries(page.alternates)
      .map(
        ([lang, href]) =>
          `    <xhtml:link rel="alternate" hreflang="${lang}" href="${xml(href)}"/>`,
      )
      .join('\n');
    return `  <url>\n    <loc>${xml(page.canonical)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternates}\n  </url>`;
  });

writeFileSync(
  join(outDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${sitemapEntries.join('\n')}\n</urlset>\n`,
);

// ---------- robots.txt ----------

writeFileSync(
  join(outDir, 'robots.txt'),
  [
    `# ${origin}`,
    '# Cała strona jest otwarta dla wyszukiwarek i asystentów AI.',
    'User-agent: *',
    'Allow: /',
    '',
    '# Roboty wyszukiwarek i asystentów AI – jawna zgoda na czytanie strony',
    ...AI_CRAWLERS.map((bot) => `User-agent: ${bot}`),
    'Allow: /',
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    '',
  ].join('\n'),
);

// ---------- 404.html i porządki ----------

copyFileSync(byRoute.get('/404').file, join(outDir, '404.html'));
for (const route of NOT_FOUND_ROUTES) {
  rmSync(join(outDir, route), { recursive: true, force: true });
}
// Szkielet bez treści dla tras renderowanych tylko w przeglądarce – tu niepotrzebny.
rmSync(join(outDir, 'index.csr.html'), { force: true });

console.log(
  `\n  ✓ audyt bez zastrzeżeń · sitemap.xml (${indexable.length} adresów, lastmod ${lastmod}) · robots.txt · 404.html\n`,
);
