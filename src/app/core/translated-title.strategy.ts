import { effect, inject, Injectable, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { I18nService } from './i18n.service';

/**
 * Tytuł karty przeglądarki: `title` w definicji trasy to klucz ze słownika
 * `titles`, więc zmienia się razem z językiem.
 */
@Injectable({ providedIn: 'root' })
export class TranslatedTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly i18n = inject(I18nService);
  private readonly key = signal<string | undefined>(undefined);

  constructor() {
    super();
    effect(() => {
      const titles = this.i18n.t().titles as Record<string, string>;
      const key = this.key();
      const page = key && key !== 'home' ? titles[key] : undefined;
      this.title.setTitle(page ? `${page} · Byte Hero` : titles['home']);
    });
  }

  override updateTitle(snapshot: RouterStateSnapshot): void {
    this.key.set(this.buildTitle(snapshot));
  }
}
