import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/i18n.service';
import { ThemeService } from './core/theme.service';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';
import { LangHint } from './shared/lang-hint/lang-hint';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, LangHint],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Wstrzyknięcie uruchamia efekt ustawiający atrybut data-theme od startu aplikacji.
  private readonly theme = inject(ThemeService);
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  // Pełna ścieżka + #main: przy <base href="/"> sam „#main” prowadziłby na stronę główną.
  protected readonly skipHref = computed(() => `${this.i18n.path()}#main`);

  protected skipToContent(event: Event, main: HTMLElement): void {
    event.preventDefault();
    main.focus();
    main.scrollIntoView();
  }
}
