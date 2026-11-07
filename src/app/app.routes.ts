import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

// `title` to klucz ze słownika `titles` (patrz TranslatedTitleStrategy).
export const routes: Routes = [
  { path: '', title: 'home', component: Home },
  {
    path: 'games',
    title: 'games',
    loadComponent: () => import('./pages/games/games').then((m) => m.Games),
  },
  {
    path: 'games/geoquiz',
    title: 'geoquiz',
    loadComponent: () => import('./pages/geoquiz/geoquiz').then((m) => m.Geoquiz),
  },
  { path: 'geoquiz', redirectTo: 'games/geoquiz' },
  {
    path: 'books',
    title: 'books',
    loadComponent: () => import('./pages/books/books').then((m) => m.Books),
  },
  {
    path: 'privacy',
    title: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy').then((m) => m.Privacy),
  },
  {
    path: 'privacy/geoquiz',
    title: 'privacyGeoquiz',
    loadComponent: () =>
      import('./pages/privacy-geoquiz/privacy-geoquiz').then((m) => m.PrivacyGeoquiz),
  },
  {
    path: '**',
    title: 'notFound',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
