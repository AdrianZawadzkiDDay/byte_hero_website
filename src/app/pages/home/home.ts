import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { GEOQUIZ } from '../../core/site.config';
import { Icon } from '../../shared/icon/icon';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Logo, Icon],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly geoquiz = GEOQUIZ;
}
