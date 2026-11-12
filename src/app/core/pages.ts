/** Klucz podstrony – łączy trasę (`data.page`), teksty SEO, okruszki i dane strukturalne. */
export type PageKey =
  'home' | 'games' | 'geoquiz' | 'books' | 'privacy' | 'privacyGeoquiz' | 'notFound';

export interface PageInfo {
  /** Ścieżka niezależna od języka (wersja angielska dostaje prefiks `/en`). */
  path: string;
  /** Strony nadrzędne – widoczne okruszki oraz BreadcrumbList w JSON-LD. */
  trail: PageKey[];
}

export const PAGES: Record<PageKey, PageInfo> = {
  home: { path: '/', trail: [] },
  games: { path: '/games', trail: ['home'] },
  geoquiz: { path: '/games/geoquiz', trail: ['home', 'games'] },
  books: { path: '/books', trail: ['home'] },
  privacy: { path: '/privacy', trail: ['home'] },
  privacyGeoquiz: { path: '/privacy/geoquiz', trail: ['home', 'privacy'] },
  // Prerenderowana strona błędu – po buildzie trafia do `404.html`.
  notFound: { path: '/404', trail: [] },
};

const INDEXABLE_PATHS = new Set(
  Object.entries(PAGES)
    .filter(([key]) => key !== 'notFound')
    .map(([, page]) => page.path),
);

/** Czy ścieżka (bez prefiksu języka) jest jedną z prawdziwych podstron. */
export function isKnownPagePath(path: string): boolean {
  return INDEXABLE_PATHS.has(path);
}
