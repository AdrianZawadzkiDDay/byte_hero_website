import { afterNextRender, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { LangHintService } from '../../core/lang-hint.service';
import type { Lang } from '../../core/lang';
import { Icon } from '../icon/icon';

// Teksty w języku, który proponujemy – czytelnik strony w „obcym” języku ma je zrozumieć.
const TEXT: Record<Lang, { label: string; message: string; action: string; close: string }> = {
  en: {
    label: 'Language',
    message: 'This page is also available in English.',
    action: 'Switch to English',
    close: 'Dismiss',
  },
  pl: {
    label: 'Język',
    message: 'Ta strona jest dostępna po polsku.',
    action: 'Przejdź na polski',
    close: 'Zamknij',
  },
};

/**
 * Pasek „ta strona jest dostępna w Twoim języku”. Pojawia się dopiero po hydracji
 * i jest przyklejony do dołu okna, więc nie zmienia HTML-a z serwera ani układu strony.
 */
@Component({
  selector: 'app-lang-hint',
  imports: [RouterLink, Icon],
  template: `
    @if (hint.suggestion(); as lang) {
      <aside class="lang-hint" [attr.lang]="lang" [attr.aria-label]="text[lang].label">
        <p>{{ text[lang].message }}</p>
        <a class="btn btn-primary" [routerLink]="i18n.alternate(lang)" (click)="hint.dismiss()">{{
          text[lang].action
        }}</a>
        <button
          type="button"
          class="icon-btn"
          [attr.aria-label]="text[lang].close"
          (click)="hint.dismiss()"
        >
          <app-icon name="close" />
        </button>
      </aside>
    }
  `,
  styles: `
    .lang-hint {
      position: fixed;
      left: 50%;
      bottom: 16px;
      z-index: 60;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: max-content;
      max-width: calc(100vw - 32px);
      padding: 0.5rem 0.5rem 0.5rem 1.1rem;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--bg-elev);
      box-shadow: var(--shadow-md);
      transform: translateX(-50%);
      animation: lang-hint-in 0.3s ease-out;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
    }

    .btn {
      min-height: 36px;
      padding: 0.35rem 0.9rem;
      font-size: 0.9rem;
      white-space: nowrap;
    }

    .icon-btn {
      flex: none;
      width: 36px;
      height: 36px;
    }

    @keyframes lang-hint-in {
      from {
        opacity: 0;
        transform: translate(-50%, 12px);
      }
    }

    @media (max-width: 520px) {
      .lang-hint {
        flex-wrap: wrap;
        justify-content: flex-end;
        width: calc(100vw - 32px);
        padding: 0.75rem;
        border-radius: var(--radius);
      }

      p {
        flex: 1 1 100%;
      }
    }

    @media print {
      .lang-hint {
        display: none;
      }
    }
  `,
})
export class LangHint {
  protected readonly i18n = inject(I18nService);
  protected readonly hint = inject(LangHintService);
  protected readonly text = TEXT;

  constructor() {
    afterNextRender(() => this.hint.detect());
  }
}
