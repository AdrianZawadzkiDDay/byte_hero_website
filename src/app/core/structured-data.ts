import type { Translations } from '../i18n';
import type { Lang } from './lang';
import { PAGES, type PageKey } from './pages';
import { absoluteUrl, GEOQUIZ, SITE } from './site.config';

type Node = Record<string, unknown>;

// Stałe identyfikatory encji – te same w obu wersjach językowych.
const ORGANIZATION_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const LOGO_ID = `${SITE.url}/#logo`;
const GAME_ID = `${SITE.url}${PAGES.geoquiz.path}#game`;

const LOCALE: Record<Lang, string> = { pl: 'pl-PL', en: 'en' };

const asset = (path: string) => `${SITE.url}${path}`;

/**
 * Dane strukturalne schema.org (JSON-LD) dla podstrony: kto stoi za stroną
 * (Organization, WebSite), czym jest strona (WebPage, BreadcrumbList) oraz –
 * na stronie gry – opis gry (VideoGame) i pytania z odpowiedziami (FAQPage).
 * Z tych danych korzystają wyszukiwarki i asystenci AI.
 */
export function buildStructuredData(page: PageKey, lang: Lang, t: Translations): Node {
  const url = absoluteUrl(PAGES[page].path, lang);
  const graph: Node[] = [organization(t), website(), webPage(page, lang, t, url)];

  if (PAGES[page].trail.length > 0) {
    graph.push(breadcrumbs(page, lang, t, url));
  }
  if (page === 'games') {
    graph.push(gameList(lang, url));
  }
  if (page === 'geoquiz') {
    graph.push(game(t, url), faq(lang, t, url));
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function organization(t: Translations): Node {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: t.schema.organization,
    slogan: t.footer.tagline,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: asset(SITE.logo.path),
      width: SITE.logo.width,
      height: SITE.logo.height,
      caption: SITE.name,
    },
    image: { '@id': LOGO_ID },
  };
}

function website(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    alternateName: ['ByteHero', 'byte-hero.com'],
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: [LOCALE.pl, LOCALE.en],
  };
}

function webPage(page: PageKey, lang: Lang, t: Translations, url: string): Node {
  const node: Node = {
    '@type': page === 'games' ? 'CollectionPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: t.seo[page].title,
    description: t.seo[page].description,
    inLanguage: LOCALE[lang],
    isPartOf: { '@id': WEBSITE_ID },
  };

  if (PAGES[page].trail.length > 0) {
    node['breadcrumb'] = { '@id': `${url}#breadcrumb` };
  }
  if (page === 'home') {
    node['about'] = { '@id': ORGANIZATION_ID };
  }
  if (page === 'geoquiz') {
    node['mainEntity'] = { '@id': GAME_ID };
    node['primaryImageOfPage'] = {
      '@type': 'ImageObject',
      url: asset(GEOQUIZ.screenshot.path),
      width: GEOQUIZ.screenshot.width,
      height: GEOQUIZ.screenshot.height,
    };
  }
  if (page === 'privacyGeoquiz') {
    node['about'] = { '@id': GAME_ID };
    node['dateModified'] = GEOQUIZ.privacyUpdated;
  }
  return node;
}

function breadcrumbs(page: PageKey, lang: Lang, t: Translations, url: string): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [...PAGES[page].trail, page].map((key, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: t.crumbs[key],
      item: absoluteUrl(PAGES[key].path, lang),
    })),
  };
}

function gameList(lang: Lang, url: string): Node {
  return {
    '@type': 'ItemList',
    '@id': `${url}#games`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'GeoQuiz',
        url: absoluteUrl(PAGES.geoquiz.path, lang),
      },
    ],
  };
}

function game(t: Translations, url: string): Node {
  const onAndroid = GEOQUIZ.playStoreLive;
  return {
    '@type': ['VideoGame', 'WebApplication'],
    '@id': GAME_ID,
    name: 'GeoQuiz',
    alternateName: GEOQUIZ.name,
    url,
    description: t.seo.geoquiz.description,
    inLanguage: ['pl', 'en', 'de'],
    applicationCategory: 'GameApplication',
    applicationSubCategory: t.schema.gameSubCategory,
    genre: t.schema.gameGenre,
    gamePlatform: onAndroid ? [t.schema.platformWeb, 'Android'] : [t.schema.platformWeb],
    operatingSystem: onAndroid ? 'Android, Any' : 'Any',
    browserRequirements: t.schema.browserRequirements,
    playMode: 'https://schema.org/SinglePlayer',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: GEOQUIZ.webUrl,
    },
    featureList: t.geoquiz.modes.map((mode) => `${mode.name}: ${mode.text}`),
    image: [asset(GEOQUIZ.icon.path), asset(GEOQUIZ.ogImage.path)],
    screenshot: {
      '@type': 'ImageObject',
      url: asset(GEOQUIZ.screenshot.path),
      width: GEOQUIZ.screenshot.width,
      height: GEOQUIZ.screenshot.height,
      caption: t.geoquiz.screenshotCaption,
    },
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    sameAs: onAndroid ? [GEOQUIZ.webUrl, GEOQUIZ.playStoreUrl] : [GEOQUIZ.webUrl],
    ...(onAndroid ? { installUrl: GEOQUIZ.playStoreUrl } : {}),
  };
}

function faq(lang: Lang, t: Translations, url: string): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: LOCALE[lang],
    isPartOf: { '@id': `${url}#webpage` },
    about: { '@id': GAME_ID },
    mainEntity: t.geoquiz.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}
