# Byte Hero – strona wizytówka

Strona firmowa [byte-hero.com](https://byte-hero.com): Angular 22 (komponenty standalone, sygnały,
zoneless, SCSS), bez SSR – zwykła aplikacja statyczna (SPA). Motyw jasny/ciemny (domyślnie jasny),
język PL/EN, podstrony: Gry, GeoQuiz, Książki, polityki prywatności.

## Uruchomienie

```bash
npm install
npm start        # http://localhost:4200
npm run build    # produkcja → dist/byte-hero-website/browser
```

## Gdzie co zmieniać

| Co                                             | Plik                                       |
| ---------------------------------------------- | ------------------------------------------ |
| Adres e-mail, URL-e, flaga „gra w Google Play” | `src/app/core/site.config.ts`              |
| Wszystkie teksty strony (PL / EN)              | `src/app/i18n/pl.ts`, `src/app/i18n/en.ts` |
| Treść polityki prywatności GeoQuiz (PL/EN)     | `src/app/i18n/privacy-geoquiz.ts`          |
| Kolory motywu jasnego i ciemnego               | `src/styles.scss` (tokeny na `:root`)      |
| Grafiki (logo, GeoQuiz)                        | `public/img/`                              |
| Trasy                                          | `src/app/app.routes.ts`                    |

Po publikacji gry w sklepie ustaw `playStoreLive: true` w `site.config.ts` – przyciski
„Wkrótce w Google Play” zamienią się w linki do sklepu.

## Adresy podstron

| Adres              | Treść                                                  |
| ------------------ | ------------------------------------------------------ |
| `/`                | Strona główna                                          |
| `/games`           | Lista gier                                             |
| `/games/geoquiz`   | Strona gry GeoQuiz (skrót: `/geoquiz`)                 |
| `/books`           | Książki (na razie „wkrótce”)                           |
| `/privacy`         | Spis polityk prywatności                               |
| `/privacy/geoquiz` | **Polityka prywatności GeoQuiz – link do Google Play** |

## Motyw i język

- Motyw: domyślnie jasny, przełącznik w nagłówku, zapis w `localStorage` (`bh-theme`).
  Skrypt w `index.html` ustawia motyw przed pierwszym renderem (bez mignięcia).
- Język: zapamiętany wybór, a jeśli go nie ma – polski dla przeglądarek po polsku, angielski
  dla pozostałych (`bh-lang`). Tytuły kart zmieniają się razem z językiem.

## Wdrożenie: Vercel + domena z Hostingera

1. Wrzuć projekt do repozytorium (GitHub/GitLab) i zaimportuj w Vercel. `vercel.json` ustawia
   komendę budowania, katalog wyjściowy i przekierowanie SPA (każdy adres → `index.html`).
2. W Vercel: Settings → Domains → dodaj `byte-hero.com` i `www.byte-hero.com`.
3. W Hostingerze (DNS Zone) ustaw rekordy, które pokaże Vercel – zwykle rekord `A` dla `@`
   wskazujący na adres Vercela oraz `CNAME` dla `www` → `cname.vercel-dns.com`.
4. Po przepięciu DNS strona działa pod `https://byte-hero.com`, a polityka prywatności pod
   `https://byte-hero.com/privacy/geoquiz` – ten adres wklej w Google Play Console
   (Polityka aplikacji → Polityka prywatności).

## Dodawanie kolejnej gry / książki

1. Dodaj teksty do `pl.ts` i `en.ts` oraz konfigurację (URL-e) do `site.config.ts`.
2. Dodaj komponent w `src/app/pages/` i trasę w `app.routes.ts` (z kluczem `title`
   odpowiadającym wpisowi w `titles`).
3. Jeśli gra potrzebuje własnej polityki prywatności, dodaj ją analogicznie do
   `privacy-geoquiz` i podlinkuj na `/privacy`.
