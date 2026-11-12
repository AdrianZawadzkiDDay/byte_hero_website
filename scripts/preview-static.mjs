#!/usr/bin/env node
/**
 * Lokalny podgląd builda produkcyjnego: `npm run build && npm run preview`.
 * Serwuje katalog z prerenderowanymi stronami tak jak hosting statyczny i stosuje
 * reguły z `vercel.json`: przekierowania (poza zależnymi od hosta), brak końcowego
 * ukośnika, adresy bez `.html`, nagłówki oraz `404.html` z kodem 404.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

// Wzorce z vercel.json: `:path*` to dowolna reszta ścieżki, poza tym zwykłe wyrażenia regularne.
const toRegex = (source) =>
  new RegExp(`^${source.replace(/\/:path\*/g, '(?:/(.*))?').replace(/:path\*/g, '(.*)')}$`);

export function createPreviewServer(
  outDir = join(root, 'dist/byte-hero-website/browser'),
  config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8')),
) {
  const redirects = (config.redirects ?? [])
    .filter((rule) => !rule.has)
    .map((rule) => ({ ...rule, regex: toRegex(rule.source) }));
  const headerRules = (config.headers ?? []).map((rule) => ({
    ...rule,
    regex: toRegex(rule.source),
  }));
  const isFile = (path) => existsSync(path) && statSync(path).isFile();

  return createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const path = decodeURIComponent(url.pathname);
    const redirect = (status, location) => {
      response.writeHead(status, { Location: `${location}${url.search}` });
      response.end();
    };

    for (const rule of redirects) {
      const match = path.match(rule.regex);
      if (match) {
        const target = rule.destination.replace(':path*', match[1] ?? '');
        return redirect(rule.permanent ? 308 : 307, target);
      }
    }
    if (config.trailingSlash === false && path.length > 1 && path.endsWith('/')) {
      return redirect(308, path.replace(/\/+$/, ''));
    }
    if (config.cleanUrls && path.endsWith('.html')) {
      return redirect(308, path.replace(/(\/index)?\.html$/, '') || '/');
    }

    const file = [path, `${path}.html`, join(path, 'index.html')]
      .map((candidate) => join(outDir, normalize(candidate)))
      .find((candidate) => candidate.startsWith(outDir) && isFile(candidate));
    const notFound = !file || file === join(outDir, '404.html');
    const served = notFound ? join(outDir, '404.html') : file;

    const headers = { 'Content-Type': TYPES[extname(served)] ?? 'application/octet-stream' };
    for (const rule of headerRules) {
      if (rule.regex.test(path)) {
        for (const header of rule.headers) headers[header.key] = header.value;
      }
    }
    // Hosting kompresuje pliki tekstowe – robimy to samo, żeby lokalne pomiary były miarodajne.
    let body = readFileSync(served);
    const type = headers['Content-Type'];
    const compressible = ['text/', 'application/json', 'application/xml', 'image/svg'].some(
      (prefix) => type.startsWith(prefix),
    );
    if (compressible && (request.headers['accept-encoding'] ?? '').includes('gzip')) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
      headers['Vary'] = 'Accept-Encoding';
    }
    response.writeHead(notFound ? 404 : 200, headers);
    response.end(body);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? 4300);
  createPreviewServer().listen(port, () => {
    console.log(`Podgląd builda produkcyjnego: http://localhost:${port}`);
  });
}
