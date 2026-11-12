import { Routes } from '@angular/router';
import type { PageKey } from './core/pages';
import { Home } from './pages/home/home';

// `data.page` to klucz podstrony: wybiera teksty SEO, okruszki i dane strukturalne.
const page = (key: PageKey) => ({ page: key });

/** Podstrony – ten sam zestaw dla wersji polskiej (`/`) i angielskiej (`/en`). */
function pageRoutes(): Routes {
  const notFound = () => import('./pages/not-found/not-found').then((m) => m.NotFound);
  return [
    { path: '', component: Home, data: page('home') },
    {
      path: 'games',
      data: page('games'),
      loadComponent: () => import('./pages/games/games').then((m) => m.Games),
    },
    {
      path: 'games/geoquiz',
      data: page('geoquiz'),
      loadComponent: () => import('./pages/geoquiz/geoquiz').then((m) => m.Geoquiz),
    },
    {
      path: 'books',
      data: page('books'),
      loadComponent: () => import('./pages/books/books').then((m) => m.Books),
    },
    {
      path: 'privacy',
      data: page('privacy'),
      loadComponent: () => import('./pages/privacy/privacy').then((m) => m.Privacy),
    },
    {
      path: 'privacy/geoquiz',
      data: page('privacyGeoquiz'),
      loadComponent: () =>
        import('./pages/privacy-geoquiz/privacy-geoquiz').then((m) => m.PrivacyGeoquiz),
    },
    // `/404` jest prerenderowane i po buildzie staje się plikiem `404.html` (kod HTTP 404).
    { path: '404', data: page('notFound'), loadComponent: notFound },
    { path: '**', data: page('notFound'), loadComponent: notFound },
  ];
}

export const routes: Routes = [
  { path: 'en', children: pageRoutes() },
  { path: '', children: pageRoutes() },
];
