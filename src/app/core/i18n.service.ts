import { PlatformLocation } from '@angular/common';
import { computed, DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DICTIONARIES, type Translations } from '../i18n';
import { langFromPath, localizePath, normalizePath, pagePath, type Lang } from './lang';
import { isKnownPagePath } from './pages';

/**
 * Język interfejsu wynika z adresu URL: `/...` to polski, `/en/...` to angielski.
 * Dzięki temu każda wersja językowa ma własny, indeksowalny adres i jest
 * renderowana po stronie serwera od razu we właściwym języku.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  // Adres startowy znany synchronicznie na serwerze i w przeglądarce – bez mignięcia języka.
  private readonly url = signal(inject(PlatformLocation).pathname);

  readonly lang = computed<Lang>(() => langFromPath(this.url()));
  /** Aktualny słownik – w szablonach: `t().nav.games` */
  readonly t = computed<Translations>(() => DICTIONARIES[this.lang()]);
  /** Bieżąca ścieżka (z prefiksem języka, bez query i fragmentu). */
  readonly path = computed(() => normalizePath(this.url()));
  /** Bieżąca ścieżka bez prefiksu języka, np. `/games/geoquiz`. */
  readonly page = computed(() => pagePath(this.url()));

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.url.set(event.urlAfterRedirects));

    effect(() => {
      this.document.documentElement.lang = this.lang();
    });
  }

  /** Link wewnętrzny w bieżącym języku: `link('/games')` → `/en/games` na wersji angielskiej. */
  link(page: string): string {
    return localizePath(page, this.lang());
  }

  /** Ta sama podstrona w innym języku (dla nieznanych adresów – strona główna). */
  alternate(lang: Lang): string {
    const page = this.page();
    return localizePath(isKnownPagePath(page) ? page : '/', lang);
  }
}
