import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-lang-switch',
  template: `
    <div class="lang-switch" role="group" [attr.aria-label]="t().lang.label">
      <button
        type="button"
        lang="pl"
        [class.active]="i18n.lang() === 'pl'"
        [attr.aria-pressed]="i18n.lang() === 'pl'"
        [attr.aria-label]="t().lang.switchToPl"
        (click)="i18n.set('pl')"
      >
        PL
      </button>
      <button
        type="button"
        lang="en"
        [class.active]="i18n.lang() === 'en'"
        [attr.aria-pressed]="i18n.lang() === 'en'"
        [attr.aria-label]="t().lang.switchToEn"
        (click)="i18n.set('en')"
      >
        EN
      </button>
    </div>
  `,
  styles: `
    .lang-switch {
      display: inline-flex;
      padding: 3px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--bg-elev);
    }

    button {
      min-width: 40px;
      padding: 0.3rem 0.6rem;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--text-muted);
      font: inherit;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition:
        background-color 0.2s,
        color 0.2s;
    }

    button:hover {
      color: var(--text);
    }

    button.active {
      background: var(--primary);
      color: var(--on-primary);
    }
  `,
})
export class LangSwitch {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
}
