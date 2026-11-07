import { computed, DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { pl, type Translations } from '../i18n/pl';
import { en } from '../i18n/en';

export type Lang = 'pl' | 'en';

const STORAGE_KEY = 'bh-lang';
const DICTIONARIES: Record<Lang, Translations> = { pl, en };

/**
 * Język interfejsu (PL/EN). Startowo: zapamiętany wybór, a jeśli go nie ma –
 * polski dla przeglądarek po polsku, angielski dla pozostałych.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly document = inject(DOCUMENT);

  readonly lang = signal<Lang>(detectLang());
  /** Aktualny słownik – w szablonach: `t().nav.games` */
  readonly t = computed<Translations>(() => DICTIONARIES[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.document.documentElement.lang = lang;
      this.document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', DICTIONARIES[lang].meta.description);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // brak localStorage – wybór działa tylko w tej sesji
      }
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }
}

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pl' || stored === 'en') {
      return stored;
    }
  } catch {
    // ignorujemy – użyjemy języka przeglądarki
  }
  const browser = typeof navigator !== 'undefined' ? navigator.language : '';
  return browser.toLowerCase().startsWith('pl') ? 'pl' : 'en';
}
