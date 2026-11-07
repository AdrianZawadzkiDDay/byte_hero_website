import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { GEOQUIZ } from '../../core/site.config';
import { Logo } from '../../shared/logo/logo';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Logo, Icon],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly t = inject(I18nService).t;
  protected readonly geoquiz = GEOQUIZ;
}
