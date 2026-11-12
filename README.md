# Byte Hero – strona wizytówka

Strona firmowa [byte-hero.com](https://byte-hero.com): Angular 22 (komponenty standalone, sygnały,
zoneless, SCSS) z renderowaniem po stronie serwera w trybie **prerenderingu** (`@angular/ssr`,
`outputMode: "static"`). Każda podstrona w każdym języku jest podczas builda renderowana do
gotowego HTML-a, a w przeglądarce Angular ją „ożywia” (hydracja). Roboty wyszukiwarek
i asystentów AI dostają pełną treść bez uruchamiania JavaScriptu, a hosting pozostaje statyczny.

## Uruchomienie

```bash
npm install
npm start          # serwer deweloperski z renderowaniem serwerowym: http://localhost:4200
npm run build      # build produkcyjny + audyt SEO + sitemap.xml, robots.txt, 404.html
npm run preview    # podgląd builda z regułami z vercel.json: http://localhost:4300
```

`npm run build` kończy się błędem, jeśli audyt SEO znajdzie problem (patrz niżej), więc wadliwa
wersja nie trafi na produkcję.

## Adresy podstron

Język wynika z adresu: wersja polska bez prefiksu, angielska pod `/en`.

| Polski             | English               | Treść                                                  |
| ------------------ | --------------------- | ------------------------------------------------------ |
| `/`                | `/en`                 | Strona główna                                          |
| `/games`           | `/en/games`           | Lista gier                                             |
| `/games/geoquiz`   | `/en/games/geoquiz`   | Strona gry GeoQuiz (fakty, tryby, FAQ)                 |
| `/books`           | `/en/books`           | Książki (na razie „wkrótce”)                           |
| `/privacy`         | `/en/privacy`         | Spis polityk prywatności                               |
| `/privacy/geoquiz` | `/en/privacy/geoquiz` | **Polityka prywatności GeoQuiz – link do Google Play** |

Skróty `/geoquiz`, `/en/geoquiz` i `/pl/...` przekierowują (308) na właściwe adresy. Nieznane
adresy zwracają `404.html` z kodem HTTP 404.

## Gdzie co zmieniać

| Co                                                          | Plik                                       |
| ----------------------------------------------------------- | ------------------------------------------ |
| Adres witryny, e-mail, URL-e gry, flaga „gra w Google Play” | `src/app/core/site.config.ts`              |
| Teksty strony, tytuły i opisy SEO, FAQ (PL / EN)            | `src/app/i18n/pl.ts`, `src/app/i18n/en.ts` |
| Treść polityki prywatności GeoQuiz (PL / EN)                | `src/app/i18n/privacy-geoquiz.ts`          |
| Lista podstron, ich ścieżki i okruszki                      | `src/app/core/pages.ts`                    |
| Trasy (obie wersje językowe)                                | `src/app/app.routes.ts`                    |
| Dane strukturalne schema.org (JSON-LD)                      | `src/app/core/structured-data.ts`          |
| Znaczniki `<head>`: canonical, hreflang, Open Graph         | `src/app/core/seo.service.ts`              |
| Kolory motywu jasnego i ciemnego                            | `src/styles.scss` (tokeny na `:root`)      |
| Grafiki                                                     | `public/img/`                              |
| Podsumowanie strony dla modeli AI                           | `public/llms.txt`                          |
| Przekierowania, nagłówki, ustawienia hostingu               | `vercel.json`                              |

Po publikacji gry w sklepie ustaw `playStoreLive: true` w `site.config.ts`. Przyciski „Wkrótce
w Google Play” zamienią się w linki do sklepu, a dane strukturalne gry dostaną platformę Android.
Zaktualizuj wtedy także teksty z frazą „wkrótce w Google Play” w obu słownikach i w `llms.txt`.

## SEO i GEO – jak to działa

- **Pełny HTML dla robotów.** Prerendering wszystkich 12 podstron (6 × 2 języki) + hydracja.
- **Osobny adres dla każdego języka** i znaczniki `hreflang` (`pl`, `en`, `x-default` → angielski).
  Przełącznik PL/EN to zwykłe linki do odpowiednika bieżącej podstrony.
- **Znaczniki `<head>` dla każdej podstrony:** unikalny tytuł i opis, `canonical`, Open Graph,
  karta Twitter/X, `robots`. Ustawia je `SeoService` po każdej nawigacji (klucz `data.page` trasy).
- **Dane strukturalne JSON-LD:** `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`,
  na stronie gry `VideoGame` + `WebApplication` oraz `FAQPage`, na liście gier `ItemList`.
- **Treść pod wyszukiwarki AI:** sekcje „GeoQuiz w pigułce” (fakty) i FAQ na stronie gry,
  plik `llms.txt`, jawna zgoda dla robotów AI w `robots.txt`.
- **Pliki generowane przy buildzie** (`scripts/seo-postbuild.mjs`): `sitemap.xml`
  z odpowiednikami językowymi, `robots.txt`, `404.html`. Adresy pochodzą ze znaczników
  canonical/hreflang wygenerowanych stron, więc mapa zawsze zgadza się z treścią.
- **Audyt przy każdym buildzie:** jeden `<h1>`, treść w HTML-u, długość tytułu i opisu,
  unikalność, canonical wskazujący na siebie, wzajemność `hreflang`, poprawny JSON-LD,
  zgodność FAQ ze znacznikami, brak martwych linków wewnętrznych, linki w `llms.txt`.
- **Jeden adres kanoniczny:** `www` → domena główna, `byteherowebsite.vercel.app` → 308 na
  `byte-hero.com`, bez końcowych ukośników (`trailingSlash: false`).

## Języki

- Język = adres URL. Nie ma automatycznych przekierowań według języka przeglądarki
  (wyszukiwarki tego nie zalecają). Gość z innym językiem przeglądarki widzi u dołu dyskretną
  podpowiedź z linkiem do drugiej wersji; po zamknięciu nie pojawia się ponownie
  (`localStorage`: `bh-lang-hint`).
- Linki wewnętrzne twórz przez `i18n.link('/games')` – dostają prefiks `/en` na wersji angielskiej.

## Motyw

Domyślnie jasny, przełącznik w nagłówku, zapis w `localStorage` (`bh-theme`). Skrypt
w `index.html` ustawia zapamiętany motyw przed pierwszym malowaniem (bez mignięcia).

## Grafiki

Obrazy w treści to WebP w kilku szerokościach (`srcset`) z plikiem zapasowym PNG/JPG
w `<picture>`. Nowe pliki WebP generuj narzędziem opartym o `sharp`/libvips (np. `npx sharp-cli`)
albo `cwebp`. Nie używaj AVIF z systemowego `sips`: duże pliki z tego kodera dekodują się
w Chrome do pustego obrazu. Obrazy do udostępniania (Open Graph) muszą pozostać w JPG/PNG.

Pliki `.js` i `.css` mają w `vercel.json` długi, niezmienny cache, bo Angular dodaje do ich nazw
hash. Nie wkładaj do `public/` własnych skryptów ani stylów bez hasha w nazwie.

## Wdrożenie (Vercel)

Każdy push do gałęzi `main` wdraża produkcję. `vercel.json` ustawia:

- `"framework": null` – wyłącza domyślną regułę „wszystko → `/index.html`” z presetu Angular,
  dzięki czemu nieznane adresy dostają `404.html` i kod 404,
- komendę builda i katalog wyjściowy `dist/byte-hero-website/browser`,
- przekierowania, brak końcowych ukośników, nagłówki bezpieczeństwa i cache.

Po wdrożeniu sprawdź:

```bash
curl -sI https://byte-hero.com/nie-ma-takiej-strony | head -1        # oczekiwane: 404
curl -sI https://byte-hero.com/games/ | grep -i "^location"           # → /games
curl -sI https://byteherowebsite.vercel.app/ | grep -i "^location"    # → https://byte-hero.com/
curl -s https://byte-hero.com/en/games/geoquiz | grep -c "FAQPage"    # ≥ 1 (treść w HTML-u)
```

Potem zgłoś `https://byte-hero.com/sitemap.xml` w Google Search Console i Bing Webmaster Tools
(Bing zasila m.in. wyszukiwanie w ChatGPT) oraz sprawdź stronę gry w teście wyników z elementami
rozszerzonymi Google.

## Dodawanie kolejnej gry lub podstrony

1. Dodaj wpis w `PAGES` (`src/app/core/pages.ts`) – ścieżka i okruszki.
2. Dodaj trasę w `pageRoutes()` (`app.routes.ts`) z `data: page('klucz')`; trasa od razu działa
   w obu językach i jest prerenderowana.
3. Dodaj teksty do `pl.ts` i `en.ts`: `seo.klucz` (tytuł i opis) oraz `crumbs.klucz`.
   TypeScript wymusi komplet w obu językach.
4. Opcjonalnie rozszerz dane strukturalne w `structured-data.ts` i dopisz stronę do `llms.txt`.
5. `npm run build` – audyt potwierdzi, że nowa strona ma komplet znaczników.
