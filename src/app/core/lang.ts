export type Lang = 'pl' | 'en';

export const LANGS: readonly Lang[] = ['pl', 'en'];

/** Język bez prefiksu w adresie – strona główna to `/`. */
export const DEFAULT_LANG: Lang = 'pl';

/** Wersja wskazywana wyszukiwarkom dla użytkowników spoza PL/EN (hreflang="x-default"). */
export const FALLBACK_LANG: Lang = 'en';

const EN_PREFIX = '/en';

/** Usuwa query, fragment i końcowy ukośnik: `/en/games/?x=1#a` → `/en/games`. */
export function normalizePath(url: string): string {
  const path = url.split(/[?#]/)[0].replace(/\/+$/, '');
  return path === '' ? '/' : path;
}

/** Język wynika z adresu: `/en` i `/en/...` to angielski, reszta to polski. */
export function langFromPath(url: string): Lang {
  const path = normalizePath(url);
  return path === EN_PREFIX || path.startsWith(`${EN_PREFIX}/`) ? 'en' : 'pl';
}

/** Ścieżka strony niezależna od języka: `/en/games` → `/games`, `/en` → `/`. */
export function pagePath(url: string): string {
  const path = normalizePath(url);
  if (path === EN_PREFIX) {
    return '/';
  }
  return path.startsWith(`${EN_PREFIX}/`) ? path.slice(EN_PREFIX.length) : path;
}

/** Adres strony w danym języku: (`/games`, 'en') → `/en/games`. */
export function localizePath(page: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) {
    return page;
  }
  return page === '/' ? EN_PREFIX : `${EN_PREFIX}${page}`;
}
