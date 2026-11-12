import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { PAGES, type PageKey } from '../../core/pages';

/** Okruszki: „Start / Gry / GeoQuiz”. Ta sama ścieżka trafia do JSON-LD (BreadcrumbList). */
@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  template: `
    <nav class="breadcrumbs" [attr.aria-label]="t().nav.breadcrumbs">
      <ol>
        @for (key of trail(); track key) {
          <li>
            <a [routerLink]="i18n.link(pages[key].path)">{{ t().crumbs[key] }}</a>
          </li>
        }
        <li aria-current="page">{{ t().crumbs[page()] }}</li>
      </ol>
    </nav>
  `,
  styles: `
    ol {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin: 0 0 1.5rem;
      padding: 0;
      list-style: none;
      font-size: 0.9rem;
      color: var(--text-muted);
    }

    li + li::before {
      content: '/';
      margin-right: 0.4rem;
      color: var(--border);
    }

    a {
      color: var(--text-muted);
    }

    a:hover {
      color: var(--link);
    }

    [aria-current] {
      color: var(--text);
      font-weight: 600;
    }
  `,
})
export class Breadcrumbs {
  readonly page = input.required<PageKey>();

  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly pages = PAGES;
  protected readonly trail = computed(() => PAGES[this.page()].trail);
}
