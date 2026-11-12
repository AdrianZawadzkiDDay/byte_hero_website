import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { GEOQUIZ } from '../../core/site.config';
import { Breadcrumbs } from '../../shared/breadcrumbs/breadcrumbs';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink, Icon, Breadcrumbs],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly geoquiz = GEOQUIZ;
}
