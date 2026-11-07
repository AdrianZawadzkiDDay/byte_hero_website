import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { Logo } from '../logo/logo';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { LangSwitch } from '../lang-switch/lang-switch';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-header',
  host: { '(document:keydown.escape)': 'closeMenu()' },
  imports: [RouterLink, RouterLinkActive, Logo, ThemeToggle, LangSwitch, Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly t = inject(I18nService).t;
  protected readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
