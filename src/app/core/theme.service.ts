import { isPlatformBrowser } from '@angular/common';
import { computed, DOCUMENT, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'bh-theme';
const THEME_COLOR: Record<Theme, string> = { light: '#ffffff', dark: '#0e1116' };

/**
 * Motyw jasny/ciemny. Domyślnie jasny; wybór zapamiętywany w localStorage.
 * Serwer zawsze renderuje motyw jasny, a skrypt w `index.html` ustawia zapamiętany
 * motyw przed pierwszym malowaniem – stąd odczyt startowy z atrybutu `data-theme`.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.initialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.document.documentElement.setAttribute('data-theme', theme);
      this.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLOR[theme]);
    });
  }

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.theme.set(theme);
    if (this.isBrowser) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // localStorage niedostępny (np. tryb prywatny) – motyw działa tylko w tej sesji
      }
    }
  }

  private initialTheme(): Theme {
    const fromDom = this.document.documentElement.getAttribute('data-theme');
    return this.isBrowser && fromDom === 'dark' ? 'dark' : 'light';
  }
}
