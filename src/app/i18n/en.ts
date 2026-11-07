import type { Translations } from './pl';

/** UI copy – English. Must mirror the shape of `pl`. */
export const en: Translations = {
  meta: {
    description:
      'Byte Hero – a small game studio. Mobile and web games, plus books, for curious minds. Play GeoQuiz: a geography quiz on a 3D globe.',
  },
  titles: {
    home: 'Byte Hero',
    games: 'Games',
    geoquiz: 'GeoQuiz – geography quiz',
    books: 'Books',
    privacy: 'Privacy Policy',
    privacyGeoquiz: 'Privacy Policy – Geo Quiz',
    notFound: 'Page not found',
  },
  nav: {
    skip: 'Skip to content',
    main: 'Main menu',
    homeAria: 'Byte Hero – home page',
    home: 'Home',
    games: 'Games',
    books: 'Books',
    privacy: 'Privacy Policy',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  theme: {
    switchToDark: 'Switch to dark theme',
    switchToLight: 'Switch to light theme',
  },
  lang: {
    label: 'Site language',
    switchToPl: 'Polski',
    switchToEn: 'English',
  },
  common: {
    soon: 'Coming soon',
    inDevelopment: 'In development',
    free: 'Free',
    freeGame: 'Free game',
    noAds: 'No ads',
    offline: 'Works offline',
    noAccount: 'No account needed',
    playWeb: 'Play in your browser',
    googlePlaySoon: 'Coming soon to Google Play',
    googlePlay: 'Get it on Google Play',
    learnMore: 'About the game',
    privacyPolicy: 'Privacy Policy',
    backHome: 'Back to the home page',
    newTab: 'opens in a new tab',
  },
  home: {
    heroEyebrow: 'Game studio',
    heroTitle: 'Games and books for curious minds.',
    heroText:
      'Byte Hero is a small game studio. We build for the curious – people who love to learn, explore and compete. We are starting with GeoQuiz, a geography quiz on a spinning 3D globe. More games and books are on the way.',
    tileText:
      'Flags, capitals, shapes and locations of countries on a spinning 3D globe. Six modes, three languages, no ads.',
    ctaGames: 'See our games',
    pillarsEyebrow: 'What we do',
    pillarsTitle: 'Games, books and respect for players',
    pillars: [
      {
        icon: 'game',
        title: 'Games',
        text: 'Mobile and web games. GeoQuiz today; arcade games and shooters are in the works.',
      },
      {
        icon: 'book',
        title: 'Books',
        text: 'An e-book and a printed book are in preparation. Details will appear in the Books section.',
      },
      {
        icon: 'shield',
        title: 'Privacy',
        text: 'Our games show no ads, do not track you and never ask you to create an account.',
      },
    ],
    roadmapEyebrow: "What's next",
    roadmapTitle: 'What we are working on',
    roadmap: [
      { title: 'GeoQuiz on Google Play', text: 'The Android app – the same game, fully offline.' },
      { title: 'More games', text: 'Arcade games and shooters – details soon.' },
      { title: 'Books', text: 'An e-book and a printed edition.' },
    ],
  },
  games: {
    title: 'Games',
    intro: 'Games without ads or sign-ups – for your phone and your browser.',
    geoquizTagline: 'Geography quiz on a 3D globe',
    geoquizText:
      'Flags, capitals, shapes and locations of countries on a spinning globe. Six game modes, three languages, works offline.',
    upcomingTitle: 'Next game',
    upcomingText:
      'We are working on new titles, including arcade games and shooters. Details soon.',
  },
  geoquiz: {
    eyebrow: 'Game',
    tagline: 'Free geography quiz on a spinning 3D globe',
    intro:
      'Spin the globe, pick a continent and test your knowledge of the world. GeoQuiz runs in your browser and as an Android app – fully offline, with no ads and no account.',
    howTitle: 'How to play',
    steps: [
      'Spin the 3D globe and tap a continent.',
      'Choose one of six modes and the number of questions: 5, 10 or 15.',
      'Answer (four options to choose from), collect points and check your score at the end of the round.',
    ],
    modesTitle: 'Six game modes',
    modes: [
      {
        icon: '🚩',
        name: 'Flags',
        text: 'Recognise a country by its flag – or a flag by the country name.',
      },
      { icon: '🌍', name: 'Countries', text: 'Name the country highlighted on the globe.' },
      {
        icon: '🗺️',
        name: 'Shapes',
        text: 'Recognise a country by the outline of its borders alone.',
      },
      { icon: '🏛️', name: 'Capitals', text: 'Pick the capital of a random country.' },
      { icon: '📍', name: 'Where is it', text: 'Click the right country on the map.' },
      {
        icon: '📖',
        name: 'Learn',
        text: 'Click countries to discover their flags and capitals – no points, at your own pace.',
      },
    ],
    stylesTitle: 'Four globe styles',
    styles: [
      { key: 'dark', name: 'Dark', text: 'Black globe with indigo outlines.' },
      { key: 'light', name: 'Light', text: 'White globe on a light background.' },
      { key: 'day', name: 'Day', text: 'Satellite texture of the Earth.' },
      { key: 'night', name: 'Night', text: 'Night-time Earth with city lights.' },
    ],
    langsTitle: 'Three languages',
    langsText: 'Interface, country and capital names in Polish, English and German.',
    platformsTitle: 'Where to play',
    platformWeb: 'In your browser – no installation, on desktop and mobile.',
    platformAndroid: 'Android app – fully offline. Coming soon to Google Play.',
    screenshotAlt: 'GeoQuiz screenshot – globe in the Day style',
    screenshotCaption: 'Globe in the “Day” style (web version)',
    privacyTitle: 'Privacy',
    privacyText:
      'GeoQuiz collects no personal data and contains no ads or analytics. See the privacy policy for details.',
    iconAlt: 'Geo Quiz app icon',
    logoAlt: 'Geo Quiz logo',
  },
  books: {
    title: 'Books',
    intro:
      'We are working on an e-book and a printed book. Descriptions, excerpts and release dates will appear here.',
    items: [
      { icon: 'ebook', title: 'E-book', text: 'Digital edition. Details soon.' },
      { icon: 'book', title: 'Printed book', text: 'Paper edition. Details soon.' },
    ],
    contactText: 'Have a question, or want to hear about the release?',
  },
  privacy: {
    title: 'Privacy Policy',
    intro:
      'Below you will find the privacy policies of our apps. Each one lives at a permanent address.',
    siteTitle: 'The byte-hero.com website',
    siteText:
      'This website uses no tracking cookies and no analytics tools. The only things saved in your browser are your chosen theme (light/dark) and language.',
    appsTitle: 'Apps',
    geoquizText: 'Android mobile app and web version.',
    read: 'Read the policy',
  },
  privacyGeoquiz: {
    title: 'Privacy Policy',
    app: 'Geo Quiz',
    updatedLabel: 'Last updated',
    summaryTitle: 'In short',
    summary: [
      'We collect no personal data.',
      'No ads, no analytics, no tracking.',
      'No account or sign-in.',
      'Only your language and globe style are saved on your device.',
    ],
    contactTitle: 'Contact',
    contactText: 'For privacy-related questions, write to us:',
    website: 'Website',
    allPolicies: 'All privacy policies',
  },
  notFound: {
    title: 'Page not found',
    text: 'The page you are looking for does not exist or has been moved.',
  },
  footer: {
    tagline: 'Games and books, made with passion.',
    navAria: 'Footer',
    rights: 'All rights reserved.',
  },
};
