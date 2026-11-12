import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { SeoTitleStrategy } from './core/seo-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    // Znaczniki SEO (tytuł, opis, canonical, hreflang, JSON-LD) po każdej nawigacji.
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
    // HTML wygenerowany przy buildzie jest w przeglądarce „ożywiany”, a nie budowany od zera.
    provideClientHydration(),
  ],
};
