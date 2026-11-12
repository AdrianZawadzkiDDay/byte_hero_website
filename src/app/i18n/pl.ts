/** Teksty interfejsu – polski. Ten plik definiuje też kształt słownika (`Translations`). */
export const pl = {
  /** Tytuł karty i opis każdej podstrony: <title>, meta description, Open Graph, JSON-LD. */
  seo: {
    home: {
      title: 'Byte Hero',
      description:
        'Byte Hero to studio gier: gry mobilne i przeglądarkowe oraz książki dla ludzi z pasją. Zagraj w GeoQuiz – darmowy quiz geograficzny z globusem 3D.',
    },
    games: {
      title: 'Gry mobilne i przeglądarkowe',
      description:
        'Gry studia Byte Hero. GeoQuiz – quiz geograficzny z globusem 3D, bez reklam i bez zakładania konta. Kolejne gry są w przygotowaniu.',
    },
    geoquiz: {
      title: 'GeoQuiz – quiz geograficzny z globusem 3D',
      description:
        'GeoQuiz to darmowy quiz geograficzny z obracanym globusem 3D: flagi, stolice, kształty i położenie blisko 200 państw. Sześć trybów, trzy języki, bez reklam.',
    },
    books: {
      title: 'Książki',
      description:
        'Książki Byte Hero: e-book i wydanie drukowane są w przygotowaniu. Sprawdź, nad czym pracujemy i gdzie pojawią się szczegóły.',
    },
    privacy: {
      title: 'Polityka prywatności',
      description:
        'Polityki prywatności aplikacji Byte Hero oraz zasady prywatności strony byte-hero.com: bez śledzących plików cookie i bez narzędzi analitycznych.',
    },
    privacyGeoquiz: {
      title: 'Polityka prywatności – Geo Quiz',
      description:
        'Polityka prywatności gry Geo Quiz (Android i wersja webowa): nie zbieramy danych osobowych, nie ma reklam, analityki ani kont użytkowników.',
    },
    notFound: {
      title: 'Nie znaleziono strony',
      description: 'Strona, której szukasz, nie istnieje albo została przeniesiona.',
    },
  },
  /** Teksty używane tylko w danych strukturalnych schema.org (JSON-LD). */
  schema: {
    organization:
      'Byte Hero to studio gier tworzące gry mobilne i przeglądarkowe oraz książki. Pierwszą grą studia jest GeoQuiz – quiz geograficzny z obracanym globusem 3D.',
    gameGenre: ['Quiz', 'Gra edukacyjna', 'Geografia'],
    gameSubCategory: 'Quiz geograficzny',
    platformWeb: 'Przeglądarka internetowa',
    browserRequirements: 'Wymaga przeglądarki z obsługą JavaScript i WebGL',
  },
  /** Nazwy podstron w okruszkach (breadcrumbs). */
  crumbs: {
    home: 'Start',
    games: 'Gry',
    geoquiz: 'GeoQuiz',
    books: 'Książki',
    privacy: 'Polityka prywatności',
    privacyGeoquiz: 'Geo Quiz',
    notFound: '404',
  },
  nav: {
    skip: 'Przejdź do treści',
    main: 'Menu główne',
    breadcrumbs: 'Ścieżka nawigacji',
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
    factsTitle: 'GeoQuiz w pigułce',
    facts: [
      { label: 'Twórca', value: 'Byte Hero' },
      { label: 'Gatunek', value: 'Quiz geograficzny, gra edukacyjna' },
      { label: 'Zakres', value: 'Blisko 200 państw na sześciu kontynentach' },
      { label: 'Tryby gry', value: 'Flagi, Państwa, Kształty, Stolice, Gdzie leży, Nauka' },
      { label: 'Długość rundy', value: '5, 10 lub 15 pytań' },
      { label: 'Języki', value: 'Polski, angielski, niemiecki' },
      {
        label: 'Platformy',
        value: 'Przeglądarka (komputer i telefon); Android – wkrótce w Google Play',
      },
      { label: 'Cena', value: 'Darmowa – bez reklam i zakupów w aplikacji' },
      { label: 'Tryb offline', value: 'Tak, w aplikacji mobilnej' },
      { label: 'Prywatność', value: 'Bez konta, bez śledzenia, bez zbierania danych osobowych' },
    ],
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
    screenshotAlt: 'Zrzut ekranu GeoQuiz – globus 3D w stylu Dzień z Europą i Afryką',
    screenshotCaption: 'Globus w stylu „Dzień” (wersja webowa)',
    privacyTitle: 'Prywatność',
    privacyText:
      'GeoQuiz nie zbiera żadnych danych osobowych, nie zawiera reklam ani narzędzi analitycznych. Szczegóły znajdziesz w polityce prywatności.',
    faqTitle: 'Najczęstsze pytania o GeoQuiz',
    faq: [
      {
        q: 'Czym jest GeoQuiz?',
        a: 'GeoQuiz to quiz geograficzny studia Byte Hero. Na obracanym globusie 3D wybierasz kontynent, a potem sprawdzasz znajomość flag, stolic, kształtów i położenia blisko 200 państw.',
      },
      {
        q: 'Czy GeoQuiz jest darmowy?',
        a: 'Tak. GeoQuiz jest darmowy, nie zawiera reklam ani zakupów w aplikacji i nie wymaga zakładania konta.',
      },
      {
        q: 'Gdzie mogę zagrać w GeoQuiz?',
        a: 'W przeglądarce pod adresem geoquiz.byte-hero.com – bez instalacji, na komputerze i telefonie. Aplikacja na Androida pojawi się wkrótce w Google Play.',
      },
      {
        q: 'Jakie tryby gry ma GeoQuiz?',
        a: 'Sześć: Flagi, Państwa, Kształty, Stolice, Gdzie leży oraz Nauka. W trybach quizowych wybierasz rundę z 5, 10 lub 15 pytań, a tryb Nauka pozwala poznawać państwa bez punktów i bez pośpiechu.',
      },
      {
        q: 'Czy GeoQuiz działa bez internetu?',
        a: 'Aplikacja mobilna działa w pełni offline – mapy, flagi i dane o państwach są wbudowane w aplikację. Wersja przeglądarkowa wymaga połączenia, aby załadować grę.',
      },
      {
        q: 'W jakich językach dostępny jest GeoQuiz?',
        a: 'Po polsku, angielsku i niemiecku – przetłumaczony jest interfejs oraz nazwy państw i stolic.',
      },
      {
        q: 'Czy GeoQuiz zbiera dane osobowe?',
        a: 'Nie. Gra nie ma kont, reklam ani narzędzi analitycznych i nie zbiera danych osobowych. Na urządzeniu zapisuje jedynie wybrany język i styl globusa.',
      },
      {
        q: 'Dla kogo jest GeoQuiz?',
        a: 'Dla uczniów, studentów, podróżników i wszystkich ciekawych świata – do nauki flag i stolic przed sprawdzianem z geografii albo po prostu dla zabawy.',
      },
    ],
    iconAlt: 'Ikona aplikacji Geo Quiz',
    logoAlt: 'Globus – logo gry GeoQuiz',
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
      'Ta strona nie używa plików cookie służących do śledzenia ani narzędzi analitycznych. W pamięci przeglądarki zapisujemy wyłącznie wybrany motyw (jasny/ciemny) oraz informację o zamknięciu podpowiedzi językowej.',
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
