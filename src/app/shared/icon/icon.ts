import { Component, input } from '@angular/core';

export type IconName =
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'play'
  | 'external'
  | 'arrow-right'
  | 'game'
  | 'book'
  | 'ebook'
  | 'shield'
  | 'globe'
  | 'phone'
  | 'monitor'
  | 'mail'
  | 'check';

/** Zestaw ikon SVG (styl „outline”), dziedziczy kolor z `currentColor`. Dekoracyjne – aria-hidden. */
@Component({
  selector: 'app-icon',
  host: { 'aria-hidden': 'true' },
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      @switch (name()) {
        @case ('sun') {
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        }
        @case ('moon') {
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        }
        @case ('menu') {
          <path d="M4 7h16M4 12h16M4 17h16" />
        }
        @case ('close') {
          <path d="M6 6l12 12M18 6L6 18" />
        }
        @case ('play') {
          <path d="M7 4v16l13-8z" fill="currentColor" stroke="none" />
        }
        @case ('external') {
          <path d="M7 17L17 7M8 7h9v9" />
        }
        @case ('arrow-right') {
          <path d="M5 12h14M13 6l6 6-6 6" />
        }
        @case ('game') {
          <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
          <path
            d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59L2 14.5A3.5 3.5 0 0 0 5.5 18c1.1 0 2.1-.5 2.75-1.3L10 15h4l1.75 1.7A3.5 3.5 0 0 0 22 14.5l-.7-5.91A4 4 0 0 0 17.32 5z"
          />
        }
        @case ('book') {
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        }
        @case ('ebook') {
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M9 7h6M9 11h6M12 18h.01" />
        }
        @case ('shield') {
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        }
        @case ('globe') {
          <circle cx="12" cy="12" r="10" />
          <path
            d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          />
        }
        @case ('phone') {
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M12 18h.01" />
        }
        @case ('monitor') {
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        }
        @case ('mail') {
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-10 7L2 7" />
        }
        @case ('check') {
          <path d="M20 6L9 17l-5-5" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      width: 1.25em;
      height: 1.25em;
      flex: none;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
