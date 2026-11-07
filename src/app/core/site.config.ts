/**
 * Centralna konfiguracja strony. Tu zmieniasz adresy i dane kontaktowe,
 * które pojawiają się w stopce i w politykach prywatności.
 */
export const SITE = {
  name: 'Byte Hero',
  url: 'https://byte-hero.com',
  // ZMIEŃ: publiczny adres kontaktowy (stopka, podstrona Książki, polityka prywatności).
  contactEmail: 'kontakt@byte-hero.com',
} as const;

export const GEOQUIZ = {
  name: 'Geo Quiz',
  webUrl: 'https://geoquiz.byte-hero.com/',
  androidPackage: 'com.bytehero.geoquiz',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.bytehero.geoquiz',
  // Ustaw na true po publikacji w Google Play – przyciski „Wkrótce” zamienią się w linki do sklepu.
  playStoreLive: false as boolean,
  privacyPath: '/privacy/geoquiz',
  // Data ostatniej zmiany polityki prywatności (ISO) – pokazywana na stronie polityki.
  privacyUpdated: '2026-11-07',
} as const;

export const GEOQUIZ_PRIVACY_URL = `${SITE.url}${GEOQUIZ.privacyPath}`;
