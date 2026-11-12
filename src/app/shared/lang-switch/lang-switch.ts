import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { LangHintService } from '../../core/lang-hint.service';
import { LANGS, type Lang } from '../../core/lang';

/** Przełącznik PL/EN – zwykłe linki do tej samej podstrony w drugim języku (widoczne dla robotów). */
@Component({
  selector: 'app-lang-switch',
  imports: [RouterLink],
  template: `
    <nav class="lang-switch" [attr.aria-label]="t().lang.label">
      @for (lang of langs; track lang) {
        <a
          [routerLink]="i18n.alternate(lang)"
          [attr.hreflang]="lang"
          [attr.lang]="lang"
          [class.active]="i18n.lang() === lang"
          [attr.aria-current]="i18n.lang() === lang ? 'true' : null"
          (click)="hint.dismiss()"
          >{{ lang.toUpperCase() }}<span class="visually-hidden"> – {{ labels()[lang] }}</span></a
        >
      }
    </nav>
  `,
  styles: `
    .lang-switch {
      display: inline-flex;
      padding: 3px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--bg-elev);
    }

    a {
      min-width: 40px;
      padding: 0.3rem 0.6rem;
      border-radius: 999px;
      color: var(--text-muted);
      font-size: 0.8rem;
      font-weight: 700;
      line-height: 1.5;
      text-align: center;
      text-decoration: none;
      transition:
        background-color 0.2s,
        color 0.2s;
    }

    a:hover {
      color: var(--text);
    }

    a.active {
      background: var(--primary);
      color: var(--on-primary);
    }
  `,
})
export class LangSwitch {
  protected readonly i18n = inject(I18nService);
  protected readonly hint = inject(LangHintService);
  protected readonly t = this.i18n.t;
  protected readonly langs = LANGS;
  protected readonly labels = computed<Record<Lang, string>>(() => ({
    pl: this.t().lang.switchToPl,
    en: this.t().lang.switchToEn,
  }));
}
