import { inject, Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { langFromPath } from './lang';
import type { PageKey } from './pages';
import { SeoService } from './seo.service';

/**
 * Router wywołuje `updateTitle` po każdej udanej nawigacji (także tej pierwszej,
 * podczas prerenderowania), więc to jedno miejsce ustawia wszystkie znaczniki SEO.
 * Klucz podstrony pochodzi z `data.page` w definicji trasy.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly seo = inject(SeoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let route = snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const page = (route.data['page'] as PageKey | undefined) ?? 'notFound';
    this.seo.update(page, langFromPath(snapshot.url));
  }
}
