import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { GEOQUIZ } from '../../core/site.config';
import { Breadcrumbs } from '../../shared/breadcrumbs/breadcrumbs';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-geoquiz',
  imports: [RouterLink, Icon, Breadcrumbs],
  templateUrl: './geoquiz.html',
  styleUrl: './geoquiz.scss',
})
export class Geoquiz {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly geoquiz = GEOQUIZ;
}
