import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { GEOQUIZ } from '../../core/site.config';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink, Icon],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy {
  protected readonly t = inject(I18nService).t;
  protected readonly geoquiz = GEOQUIZ;
}
