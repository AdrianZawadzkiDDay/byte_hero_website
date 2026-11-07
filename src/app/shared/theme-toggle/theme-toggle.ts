import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { I18nService } from '../../core/i18n.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-theme-toggle',
  imports: [Icon],
  template: `
    <button
      type="button"
      class="icon-btn"
      (click)="theme.toggle()"
      [attr.aria-label]="label()"
      [title]="label()"
    >
      <app-icon [name]="theme.isDark() ? 'sun' : 'moon'" />
    </button>
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  private readonly t = inject(I18nService).t;
  protected readonly label = computed(() =>
    this.theme.isDark() ? this.t().theme.switchToLight : this.t().theme.switchToDark,
  );
}
