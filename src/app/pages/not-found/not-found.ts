import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="section not-found">
      <div class="container">
        <p class="code" aria-hidden="true">404</p>
        <h1>{{ t().notFound.title }}</h1>
        <p class="lead">{{ t().notFound.text }}</p>
        <a class="btn btn-primary" [routerLink]="i18n.link('/')">{{ t().common.backHome }}</a>
      </div>
    </section>
  `,
  styles: `
    .not-found {
      text-align: center;
    }

    .not-found .lead {
      margin-inline: auto;
    }

    .code {
      margin: 0;
      font-size: clamp(4rem, 15vw, 8rem);
      font-weight: 700;
      line-height: 1;
      background: linear-gradient(
        90deg,
        var(--brand-red),
        var(--brand-yellow),
        var(--brand-green),
        var(--brand-blue)
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  `,
})
export class NotFound {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
}
