import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DICTIONARIES } from '../i18n';
import { FALLBACK_LANG, LANGS, type Lang } from './lang';
import { PAGES, type PageKey } from './pages';
import { absoluteUrl, GEOQUIZ, SITE } from './site.config';
import { buildStructuredData } from './structured-data';

const OG_LOCALE: Record<Lang, string> = { pl: 'pl_PL', en: 'en_US' };
const INDEXABLE = 'index, follow, max-image-preview:large, max-snippet:-1';
const JSON_LD_ID = 'structured-data';

/**
 * Znaczniki SEO podstrony: tytuł, opis, adres kanoniczny, wersje językowe (hreflang),
 * Open Graph / Twitter oraz dane strukturalne JSON-LD. Działa tak samo podczas
 * prerenderowania na serwerze (znaczniki trafiają do HTML-a) i w przeglądarce.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(page: PageKey, lang: Lang): void {
    const t = DICTIONARIES[lang];
    const { title, description } = t.seo[page];
    const fullTitle = page === 'home' ? title : `${title} · ${SITE.name}`;
    const indexable = page !== 'notFound';
    const path = PAGES[page].path;
    const url = absoluteUrl(path, lang);
    const image = page === 'geoquiz' ? GEOQUIZ.ogImage : SITE.ogImage;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: indexable ? INDEXABLE : 'noindex, follow' });

    // Adres kanoniczny i odpowiedniki językowe – tylko dla stron do indeksowania.
    this.setLink('canonical', indexable ? { rel: 'canonical', href: url } : null);
    for (const alternate of LANGS) {
      this.setLink(
        `alternate-${alternate}`,
        indexable
          ? { rel: 'alternate', hreflang: alternate, href: absoluteUrl(path, alternate) }
          : null,
      );
    }
    this.setLink(
      'alternate-x-default',
      indexable
        ? { rel: 'alternate', hreflang: 'x-default', href: absoluteUrl(path, FALLBACK_LANG) }
        : null,
    );

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE.name });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: indexable ? url : `${SITE.url}/` });
    this.meta.updateTag({ property: 'og:image', content: `${SITE.url}${image.path}` });
    this.meta.updateTag({ property: 'og:image:width', content: String(image.width) });
    this.meta.updateTag({ property: 'og:image:height', content: String(image.height) });
    this.meta.updateTag({ property: 'og:image:alt', content: fullTitle });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[lang] });
    this.meta.updateTag({
      property: 'og:locale:alternate',
      content: OG_LOCALE[lang === 'pl' ? 'en' : 'pl'],
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: `${SITE.url}${image.path}` });

    this.setJsonLd(indexable ? buildStructuredData(page, lang, t) : null);
  }

  /** Tworzy, aktualizuje lub usuwa znacznik <link> zarządzany przez serwis. */
  private setLink(key: string, attributes: Record<string, string> | null): void {
    const head = this.document.head;
    let link = head.querySelector(`link[data-seo="${key}"]`);
    if (!attributes) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('data-seo', key);
      head.appendChild(link);
    }
    for (const [name, value] of Object.entries(attributes)) {
      link.setAttribute(name, value);
    }
  }

  private setJsonLd(data: object | null): void {
    let script = this.document.getElementById(JSON_LD_ID);
    if (!data) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_ID;
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    // `<` jako < – treść nie może zamknąć znacznika <script>.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }
}
