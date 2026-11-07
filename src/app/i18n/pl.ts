/** Teksty interfejsu – polski. Ten plik definiuje też kształt słownika (`Translations`). */
export const pl = {
  meta: {
    description:
      'Byte Hero – małe studio gier. Gry mobilne i webowe oraz książki dla ludzi z pasją. Zagraj w GeoQuiz: quiz geograficzny z globusem 3D.',
  },
  titles: {
    home: 'Byte Hero',
    games: 'Gry',
    geoquiz: 'GeoQuiz – quiz geograficzny',
    books: 'Książki',
    privacy: 'Polityka prywatności',
    privacyGeoquiz: 'Polityka prywatności – Geo Quiz',
    notFound: 'Nie znaleziono strony',
  },
  nav: {
    skip: 'Przejdź do treści',
    main: 'Menu główne',
    homeAria: 'Byte Hero – strona główna',
    home: 'Start',
    games: 'Gry',
    books: 'Książki',
    privacy: 'Polityka prywatności',
    contact: 'Kontakt',
    openMenu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
  },
  theme: {
    switchToDark: 'Włącz ciemny motyw',
    switchToLight: 'Włącz jasny motyw',
  },
  lang: {
    label: 'Język strony',
    switchToPl: 'Polski',
    switchToEn: 'English',
  },
  common: {
    soon: 'Wkrótce',
    inDevelopment: 'W przygotowaniu',
    free: 'Darmowa',
    freeGame: 'Darmowa gra',
    noAds: 'Bez reklam',
    offline: 'Działa offline',
    noAccount: 'Bez konta',
    playWeb: 'Zagraj w przeglądarce',
    googlePlaySoon: 'Wkrótce w Google Play',
    googlePlay: 'Pobierz z Google Play',
    learnMore: 'Więcej o grze',
    privacyPolicy: 'Polityka prywatności',
    backHome: 'Wróć na stronę główną',
    newTab: 'otwiera się w nowej karcie',
  },
  home: {
    heroEyebrow: 'Studio gier',
    heroTitle: 'Gry i książki dla ludzi z pasją.',
    heroText:
      'Byte Hero to małe studio gier. Tworzymy dla ciekawych świata – tych, którzy lubią się uczyć, odkrywać i rywalizować. Zaczynamy od GeoQuiz, quizu geograficznego z obracanym globusem 3D. W planach kolejne gry oraz książki.',
    tileText:
      'Flagi, stolice, kształty i położenie państw na obracanym globusie 3D. Sześć trybów, trzy języki, bez reklam.',
    ctaGames: 'Zobacz gry',
    pillarsEyebrow: 'Czym się zajmujemy',
    pillarsTitle: 'Gry, książki i szacunek dla gracza',
    pillars: [
      {
        icon: 'game',
        title: 'Gry',
        text: 'Gry mobilne i webowe. Dziś GeoQuiz, w przygotowaniu gry zręcznościowe i strzelanki.',
      },
      {
        icon: 'book',
        title: 'Książki',
        text: 'E-book i książka drukowana są w przygotowaniu. Szczegóły pojawią się w zakładce Książki.',
      },
      {
        icon: 'shield',
        title: 'Prywatność',
        text: 'Nasze gry nie wyświetlają reklam, nie śledzą użytkowników i nie wymagają zakładania konta.',
      },
    ],
    roadmapEyebrow: 'Co dalej',
    roadmapTitle: 'Nad czym pracujemy',
    roadmap: [
      {
        title: 'GeoQuiz w Google Play',
        text: 'Aplikacja na Androida – ta sama gra, w pełni offline.',
      },
      { title: 'Kolejne gry', text: 'Gry zręcznościowe i strzelanki – szczegóły wkrótce.' },
      { title: 'Książki', text: 'E-book oraz wydanie drukowane.' },
    ],
  },
  games: {
    title: 'Gry',
    intro: 'Gry bez reklam i bez zakładania konta – na telefon i do przeglądarki.',
    geoquizTagline: 'Quiz geograficzny z globusem 3D',
    geoquizText:
      'Flagi, stolice, kształty i położenie państw na obracanym globusie. Sześć trybów gry, trzy języki, działa offline.',
    upcomingTitle: 'Kolejna gra',
    upcomingText:
      'Pracujemy nad kolejnymi tytułami – między innymi grami zręcznościowymi i strzelankami. Szczegóły wkrótce.',
  },
  geoquiz: {
    eyebrow: 'Gra',
    tagline: 'Darmowy quiz geograficzny z obracanym globusem 3D',
    intro:
      'Obracaj globus, wybierz kontynent i sprawdź swoją wiedzę o świecie. GeoQuiz działa w przeglądarce oraz jako aplikacja na Androida – w pełni offline, bez reklam i bez konta.',
    howTitle: 'Jak się gra',
    steps: [
      'Obróć globus 3D i dotknij wybranego kontynentu.',
      'Wybierz jeden z sześciu trybów oraz liczbę pytań: 5, 10 lub 15.',
      'Odpowiadaj (cztery odpowiedzi do wyboru), zbieraj punkty i sprawdź wynik na koniec rundy.',
    ],
    modesTitle: 'Sześć trybów gry',
    modes: [
      {
        icon: '🚩',
        name: 'Flagi',
        text: 'Rozpoznaj państwo po fladze – albo flagę po nazwie państwa.',
      },
      { icon: '🌍', name: 'Państwa', text: 'Podaj nazwę państwa podświetlonego na globusie.' },
      { icon: '🗺️', name: 'Kształty', text: 'Rozpoznaj państwo po samym obrysie jego granic.' },
      { icon: '🏛️', name: 'Stolice', text: 'Wskaż stolicę wylosowanego państwa.' },
      { icon: '📍', name: 'Gdzie leży', text: 'Kliknij właściwe państwo na mapie.' },
      {
        icon: '📖',
        name: 'Nauka',
        text: 'Klikaj państwa i poznawaj ich flagi oraz stolice – bez punktów, we własnym tempie.',
      },
    ],
    stylesTitle: 'Cztery style globusa',
    styles: [
      { key: 'dark', name: 'Ciemny', text: 'Czarna kula z indygo konturami.' },
      { key: 'light', name: 'Jasny', text: 'Biała kula na jasnym tle.' },
      { key: 'day', name: 'Dzień', text: 'Zdjęcie satelitarne Ziemi.' },
      { key: 'night', name: 'Noc', text: 'Nocna Ziemia ze światłami miast.' },
    ],
    langsTitle: 'Trzy języki',
    langsText: 'Interfejs oraz nazwy państw i stolic po polsku, angielsku i niemiecku.',
    platformsTitle: 'Gdzie zagrać',
    platformWeb: 'W przeglądarce – bez instalacji, na komputerze i telefonie.',
    platformAndroid: 'Aplikacja na Androida – w pełni offline. Wkrótce w Google Play.',
    screenshotAlt: 'Zrzut ekranu GeoQuiz – globus w stylu Dzień',
    screenshotCaption: 'Globus w stylu „Dzień” (wersja webowa)',
    privacyTitle: 'Prywatność',
    privacyText:
      'GeoQuiz nie zbiera żadnych danych osobowych, nie zawiera reklam ani narzędzi analitycznych. Szczegóły znajdziesz w polityce prywatności.',
    iconAlt: 'Ikona aplikacji Geo Quiz',
    logoAlt: 'Logo Geo Quiz',
  },
  books: {
    title: 'Książki',
    intro:
      'Pracujemy nad e-bookiem i książką drukowaną. Opisy, fragmenty i terminy premier pojawią się w tym miejscu.',
    items: [
      { icon: 'ebook', title: 'E-book', text: 'Wersja cyfrowa. Szczegóły wkrótce.' },
      { icon: 'book', title: 'Książka drukowana', text: 'Wydanie papierowe. Szczegóły wkrótce.' },
    ],
    contactText: 'Masz pytania albo chcesz dostać wiadomość o premierze?',
  },
  privacy: {
    title: 'Polityka prywatności',
    intro:
      'Poniżej znajdziesz polityki prywatności naszych aplikacji. Każda z nich jest dostępna pod stałym adresem.',
    siteTitle: 'Strona byte-hero.com',
    siteText:
      'Ta strona nie używa plików cookie służących do śledzenia ani narzędzi analitycznych. W pamięci przeglądarki zapisujemy wyłącznie wybrany motyw (jasny/ciemny) i język.',
    appsTitle: 'Aplikacje',
    geoquizText: 'Aplikacja mobilna na Androida oraz wersja webowa.',
    read: 'Czytaj politykę',
  },
  privacyGeoquiz: {
    title: 'Polityka prywatności',
    app: 'Geo Quiz',
    updatedLabel: 'Ostatnia aktualizacja',
    summaryTitle: 'W skrócie',
    summary: [
      'Nie zbieramy żadnych danych osobowych.',
      'Brak reklam, analityki i śledzenia.',
      'Nie ma konta ani logowania.',
      'Na urządzeniu zapisujemy tylko język i styl globusa.',
    ],
    contactTitle: 'Kontakt',
    contactText: 'W sprawach związanych z prywatnością napisz do nas:',
    website: 'Strona',
    allPolicies: 'Wszystkie polityki prywatności',
  },
  notFound: {
    title: 'Nie znaleziono strony',
    text: 'Strona, której szukasz, nie istnieje albo została przeniesiona.',
  },
  footer: {
    tagline: 'Gry i książki tworzone z pasją.',
    navAria: 'Stopka',
    rights: 'Wszelkie prawa zastrzeżone.',
  },
};

export type Translations = typeof pl;
