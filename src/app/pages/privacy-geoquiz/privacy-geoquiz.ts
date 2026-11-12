import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n.service';
import { absoluteUrl, GEOQUIZ, SITE } from '../../core/site.config';
import { privacyGeoquiz } from '../../i18n/privacy-geoquiz';
import { Breadcrumbs } from '../../shared/breadcrumbs/breadcrumbs';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-privacy-geoquiz',
  imports: [RouterLink, Icon, Breadcrumbs],
  templateUrl: './privacy-geoquiz.html',
  styleUrl: './privacy-geoquiz.scss',
})
export class PrivacyGeoquiz {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly site = SITE;

  /** Stały adres polityki w bieżącym języku – ten link trafia do Google Play. */
  protected readonly policyUrl = computed(() => absoluteUrl(GEOQUIZ.privacyPath, this.i18n.lang()));

  protected readonly sections = computed(() =>
    privacyGeoquiz[this.i18n.lang()]({
      appName: GEOQUIZ.name,
      androidPackage: GEOQUIZ.androidPackage,
      webUrl: GEOQUIZ.webUrl,
      policyUrl: this.policyUrl(),
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
