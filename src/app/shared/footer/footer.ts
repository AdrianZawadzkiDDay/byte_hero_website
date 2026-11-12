import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { SITE } from '../../core/site.config';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
