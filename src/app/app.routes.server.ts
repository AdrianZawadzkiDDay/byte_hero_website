import { RenderMode, ServerRoute } from '@angular/ssr';
import { localizePath, LANGS } from './core/lang';
import { PAGES } from './core/pages';

// Każda podstrona w każdym języku jest renderowana do statycznego HTML-a podczas builda.
const prerendered: ServerRoute[] = Object.values(PAGES).flatMap((page) =>
  LANGS.map((lang): ServerRoute => ({
    path: localizePath(page.path, lang).slice(1),
    renderMode: RenderMode.Prerender,
  })),
);

export const serverRoutes: ServerRoute[] = [
  ...prerendered,
  // Nieznane adresy: hosting zwraca prerenderowany `404.html`, a aplikacja
  // po starcie w przeglądarce pokazuje stronę błędu we właściwym języku.
  { path: '**', renderMode: RenderMode.Client },
];
