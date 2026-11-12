import { computed, inject, Injectable, signal } from '@angular/core';
import { I18nService } from './i18n.service';
import type { Lang } from './lang';

const STORAGE_KEY = 'bh-lang-hint';

/**
 * Podpowiedź „ta strona jest dostępna w Twoim języku”. Język wynika z adresu URL
 * (bez automatycznych przekierowań – tak zalecają wyszukiwarki), więc gościom
 * z innym językiem przeglądarki pokazujemy dyskretny link do drugiej wersji.
 */
@Injectable({ providedIn: 'root' })
export class LangHintService {
  private readonly i18n = inject(I18nService);
  private readonly browserLang = signal<Lang | null>(null);
  private readonly dismissed = signal(false);

  /** Język, który warto zaproponować, albo `null`. */
  readonly suggestion = computed<Lang | null>(() => {
    const preferred = this.browserLang();
    return preferred && !this.dismissed() && preferred !== this.i18n.lang() ? preferred : null;
  });

  /** Odczyt języka przeglądarki – wywoływany dopiero po hydracji, tylko w przeglądarce. */
  detect(): void {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        this.dismissed.set(true);
        return;
      }
    } catch {
      // brak localStorage – podpowiedź po prostu pokaże się ponownie
    }
    const browser = (navigator.languages?.[0] ?? navigator.language ?? '').toLowerCase();
    this.browserLang.set(browser.startsWith('pl') ? 'pl' : 'en');
  }

  /** Użytkownik zamknął podpowiedź albo sam wybrał język – nie pokazuj jej więcej. */
  dismiss(): void {
    this.dismissed.set(true);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // brak localStorage – wybór działa tylko w tej sesji
    }
  }
}
