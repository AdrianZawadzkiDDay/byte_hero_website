import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { ThemeService } from '../../core/theme.service';
import { Icon } from '../icon/icon';

/**
 * Obie ikony są zawsze w DOM, a o widoczności decyduje CSS na podstawie `data-theme`.
 * Dzięki temu HTML z serwera (motyw jasny) pasuje do stanu w przeglądarce także wtedy,
 * gdy użytkownik ma zapamiętany motyw ciemny – i właściwa ikona jest widoczna od razu.
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [Icon],
  template: `
    <button
      type="button"
      class="icon-btn"
      (click)="theme.toggle()"
      [attr.aria-label]="label()"
      [attr.title]="label()"
    >
      <app-icon name="moon" class="moon" />
      <app-icon name="sun" class="sun" />
    </button>
  `,
  styles: `
    .sun {
      display: none;
    }

    :host-context([data-theme='dark']) .sun {
      display: inline-flex;
    }

    :host-context([data-theme='dark']) .moon {
      display: none;
    }
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  private readonly t = inject(I18nService).t;
  protected readonly label = computed(() =>
    this.theme.isDark() ? this.t().theme.switchToLight : this.t().theme.switchToDark,
  );
}
