import { localizePath, type Lang } from './lang';

/**
 * Centralna konfiguracja strony: adresy, dane kontaktowe i grafiki używane
 * w treści, znacznikach SEO (canonical, hreflang, Open Graph) i danych strukturalnych.
 */
export const SITE = {
  name: 'Byte Hero',
  // Adres kanoniczny, bez końcowego ukośnika. Trafia do canonical, hreflang, og:url,
  // JSON-LD, a po buildzie także do sitemap.xml i robots.txt.
  url: 'https://byte-hero.com',
  // Publiczny adres kontaktowy – wyświetlany jako zwykły tekst (bez linków mailto)
  // w stopce, na podstronie Książki i w polityce prywatności.
  contactEmail: 'adrianmercury33@gmail.com',
  logo: { path: '/img/brand/byte-hero-logo.png', width: 2800, height: 800 },
  // Domyślny obraz przy udostępnianiu linku (Open Graph / Twitter).
  ogImage: { path: '/img/brand/og-image.png', width: 1200, height: 628 },
} as const;

export const GEOQUIZ = {
  name: 'Geo Quiz',
  webUrl: 'https://geoquiz.byte-hero.com/',
  androidPackage: 'com.bytehero.geoquiz',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.bytehero.geoquiz',
  // Ustaw na true po publikacji w Google Play – przyciski „Wkrótce” zamienią się w linki
  // do sklepu, a dane strukturalne gry dostaną platformę Android i adres instalacji.
  playStoreLive: false as boolean,
  privacyPath: '/privacy/geoquiz',
  // Data ostatniej zmiany polityki prywatności (ISO) – widoczna na stronie i w JSON-LD.
  privacyUpdated: '2026-11-07',
  icon: { path: '/img/geoquiz/icon-512.png', width: 512, height: 512 },
  ogImage: { path: '/img/geoquiz/og-geoquiz.jpg', width: 1200, height: 630 },
  screenshot: { path: '/img/geoquiz/screenshot-day.jpg', width: 1600, height: 893 },
} as const;

/** Pełny adres podstrony w danym języku, np. (`/games`, 'en') → `https://byte-hero.com/en/games`. */
export function absoluteUrl(page: string, lang: Lang): string {
  const path = localizePath(page, lang);
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`;
}
