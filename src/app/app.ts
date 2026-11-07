import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { I18nService } from './core/i18n.service';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Wstrzyknięcie uruchamia efekty (atrybut data-theme, lang) od startu aplikacji.
  private readonly theme = inject(ThemeService);
  protected readonly t = inject(I18nService).t;
}
