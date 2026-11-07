import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { GEOQUIZ, GEOQUIZ_PRIVACY_URL, SITE } from '../../core/site.config';
import { privacyGeoquiz } from '../../i18n/privacy-geoquiz';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-privacy-geoquiz',
  imports: [RouterLink, Icon],
  templateUrl: './privacy-geoquiz.html',
  styleUrl: './privacy-geoquiz.scss',
})
export class PrivacyGeoquiz {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly site = SITE;
  protected readonly policyUrl = GEOQUIZ_PRIVACY_URL;

  protected readonly sections = computed(() =>
    privacyGeoquiz[this.i18n.lang()]({
      appName: GEOQUIZ.name,
      androidPackage: GEOQUIZ.androidPackage,
      webUrl: GEOQUIZ.webUrl,
      policyUrl: GEOQUIZ_PRIVACY_URL,
    }),
  );

  /** Data aktualizacji w formacie zależnym od języka, np. „7 listopada 2026”. */
  protected readonly updated = computed(() => {
    const [year, month, day] = GEOQUIZ.privacyUpdated.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString(
      this.i18n.lang() === 'pl' ? 'pl-PL' : 'en-GB',
      { year: 'numeric', month: 'long', day: 'numeric' },
    );
  });

  protected readonly updatedIso = GEOQUIZ.privacyUpdated;
}
