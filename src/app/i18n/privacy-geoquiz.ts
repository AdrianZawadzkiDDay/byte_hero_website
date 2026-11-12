import type { Lang } from '../core/lang';

export interface PolicySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  after?: string[];
}

export interface PolicyContext {
  appName: string;
  androidPackage: string;
  webUrl: string;
  policyUrl: string;
}

/**
 * Treść polityki prywatności Geo Quiz (PL/EN). Dane kontaktowe renderuje
 * szablon strony na podstawie `site.config.ts`.
 */
export const privacyGeoquiz: Record<Lang, (ctx: PolicyContext) => PolicySection[]> = {
  pl: (ctx) => [
    {
      heading: '1. Informacje ogólne',
      paragraphs: [
        `Niniejsza polityka prywatności dotyczy aplikacji mobilnej „${ctx.appName}” (identyfikator pakietu Android: ${ctx.androidPackage}) oraz jej wersji webowej dostępnej pod adresem ${ctx.webUrl} (dalej łącznie: „Aplikacja”). Aplikację udostępnia Byte Hero (dalej: „my”).`,
        'Aplikacja jest bezpłatna i nie zawiera reklam ani zakupów w aplikacji.',
      ],
    },
    {
      heading: '2. Jakie dane zbieramy',
      paragraphs: [
        'Nie zbieramy, nie przechowujemy ani nikomu nie przekazujemy żadnych danych osobowych użytkowników. Korzystanie z Aplikacji nie wymaga zakładania konta, logowania ani podawania jakichkolwiek informacji o sobie.',
        'Nie korzystamy z narzędzi analitycznych, sieci reklamowych, systemów śledzenia ani zewnętrznych pakietów SDK gromadzących dane o użytkownikach.',
      ],
    },
    {
      heading: '3. Dane przechowywane lokalnie na urządzeniu',
      paragraphs: ['Aplikacja zapisuje wyłącznie na Twoim urządzeniu następujące ustawienia:'],
      bullets: [
        'wybrany język interfejsu (polski, angielski lub niemiecki),',
        'wybrany styl globusa (ciemny, jasny, dzień lub noc).',
      ],
      after: [
        'Ustawienia te służą jedynie do zapamiętania Twoich preferencji między kolejnymi uruchomieniami. Nie są nigdzie wysyłane i nie pozwalają na Twoją identyfikację. Wyniki quizów nie są zapisywane ani przesyłane.',
        'Ustawienia możesz usunąć, odinstalowując aplikację lub – w wersji webowej – czyszcząc dane witryny w przeglądarce.',
      ],
    },
    {
      heading: '4. Uprawnienia',
      paragraphs: [
        'Aplikacja mobilna działa w trybie offline i nie wymaga dostępu do lokalizacji, kontaktów, aparatu, mikrofonu, plików ani innych wrażliwych uprawnień systemowych.',
      ],
    },
    {
      heading: '5. Wersja webowa',
      paragraphs: [
        'Wersja webowa Aplikacji jest hostowana u zewnętrznego dostawcy usług hostingowych. Jak w przypadku każdej strony internetowej, serwer może automatycznie rejestrować standardowe dane techniczne (np. adres IP, typ przeglądarki, datę i godzinę żądania) w logach serwera w celu zapewnienia bezpieczeństwa i prawidłowego działania usługi. Nie łączymy tych danych z żadnymi innymi informacjami i nie wykorzystujemy ich do identyfikacji użytkowników.',
        'Wersja webowa nie używa plików cookie służących do śledzenia. Korzysta jedynie z pamięci lokalnej przeglądarki, aby zapisać preferencje opisane powyżej.',
      ],
    },
    {
      heading: '6. Usługi zewnętrzne',
      paragraphs: [
        'Aplikacja nie integruje się z usługami firm trzecich gromadzącymi dane (takimi jak analityka, reklamy czy logowanie przez media społecznościowe).',
        'Aplikacja mobilna jest dystrybuowana przez sklep Google Play. Pobieranie i instalacja odbywają się na zasadach określonych przez Google i podlegają polityce prywatności Google, na którą nie mamy wpływu.',
      ],
    },
    {
      heading: '7. Dzieci',
      paragraphs: [
        'Aplikacja jest odpowiednia dla użytkowników w każdym wieku. Nie zbieramy świadomie żadnych danych osobowych od nikogo – w tym od dzieci poniżej 13. roku życia (ani poniżej 16. roku życia w rozumieniu RODO). Jeśli uważasz, że dziecko przekazało nam dane osobowe, skontaktuj się z nami, a niezwłocznie je usuniemy.',
      ],
    },
    {
      heading: '8. Twoje prawa',
      paragraphs: [
        'Ponieważ nie przetwarzamy danych osobowych, nie posiadamy informacji, do których można by żądać dostępu, ich sprostowania lub usunięcia. Jeśli mimo to masz pytania dotyczące prywatności lub uważasz, że Aplikacja działa niezgodnie z niniejszą polityką, napisz do nas – odpowiemy najszybciej, jak to możliwe.',
        'Masz również prawo wnieść skargę do organu nadzorczego (w Polsce: Prezes Urzędu Ochrony Danych Osobowych).',
      ],
    },
    {
      heading: '9. Zmiany polityki',
      paragraphs: [
        `Możemy aktualizować niniejszą politykę, na przykład gdy w Aplikacji pojawią się nowe funkcje. Aktualna wersja jest zawsze dostępna pod adresem ${ctx.policyUrl}, a data ostatniej aktualizacji znajduje się na górze strony. Zachęcamy do okresowego sprawdzania tej strony.`,
      ],
    },
  ],

  en: (ctx) => [
    {
      heading: '1. General information',
      paragraphs: [
        `This privacy policy applies to the mobile application “${ctx.appName}” (Android package name: ${ctx.androidPackage}) and its web version available at ${ctx.webUrl} (together: the “App”). The App is provided by Byte Hero (“we”, “us”).`,
        'The App is free of charge and contains no advertising or in-app purchases.',
      ],
    },
    {
      heading: '2. What data we collect',
      paragraphs: [
        'We do not collect, store or share any personal data of our users. Using the App does not require creating an account, signing in or providing any information about yourself.',
        'We do not use analytics tools, advertising networks, tracking systems or any third-party SDKs that gather data about users.',
      ],
    },
    {
      heading: '3. Data stored locally on your device',
      paragraphs: ['The App saves the following settings on your device only:'],
      bullets: [
        'the selected interface language (Polish, English or German),',
        'the selected globe style (dark, light, day or night).',
      ],
      after: [
        'These settings exist solely to remember your preferences between sessions. They are never transmitted anywhere and cannot identify you. Quiz results are neither saved nor transmitted.',
        'You can remove the settings by uninstalling the app or, in the web version, by clearing the site data in your browser.',
      ],
    },
    {
      heading: '4. Permissions',
      paragraphs: [
        'The mobile App works offline and does not request access to your location, contacts, camera, microphone, files or any other sensitive system permissions.',
      ],
    },
    {
      heading: '5. Web version',
      paragraphs: [
        'The web version of the App is hosted by a third-party hosting provider. As with any website, the server may automatically record standard technical data (such as IP address, browser type, and the date and time of a request) in server logs for security and operational purposes. We do not combine this data with any other information and do not use it to identify users.',
        'The web version does not use tracking cookies. It only uses the browser’s local storage to save the preferences described above.',
      ],
    },
    {
      heading: '6. Third-party services',
      paragraphs: [
        'The App does not integrate with any third-party services that collect data (such as analytics, advertising or social sign-in).',
        'The mobile App is distributed through Google Play. Downloading and installing it is governed by Google’s terms and Google’s privacy policy, over which we have no control.',
      ],
    },
    {
      heading: '7. Children',
      paragraphs: [
        'The App is suitable for users of all ages. We do not knowingly collect any personal data from anyone, including children under 13 (or under 16 within the meaning of the GDPR). If you believe a child has provided us with personal data, please contact us and we will delete it promptly.',
      ],
    },
    {
      heading: '8. Your rights',
      paragraphs: [
        'Because we do not process personal data, we hold no information that could be accessed, corrected or deleted on request. If you nevertheless have questions about privacy, or believe the App behaves in a way inconsistent with this policy, contact us and we will respond as soon as possible.',
        'You also have the right to lodge a complaint with a supervisory authority (in Poland: the President of the Personal Data Protection Office, UODO).',
      ],
    },
    {
      heading: '9. Changes to this policy',
      paragraphs: [
        `We may update this policy, for example when new features are added to the App. The current version is always available at ${ctx.policyUrl}, and the date of the last update is shown at the top of this page. We encourage you to check this page from time to time.`,
      ],
    },
  ],
};
