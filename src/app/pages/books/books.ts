import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';
import { SITE } from '../../core/site.config';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-books',
  imports: [Icon],
  templateUrl: './books.html',
  styleUrl: './books.scss',
})
export class Books {
  protected readonly t = inject(I18nService).t;
  protected readonly site = SITE;
}
