import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { GEOQUIZ } from '../../core/site.config';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-games',
  imports: [RouterLink, Icon],
  templateUrl: './games.html',
  styleUrl: './games.scss',
})
export class Games {
  protected readonly t = inject(I18nService).t;
  protected readonly geoquiz = GEOQUIZ;
}
