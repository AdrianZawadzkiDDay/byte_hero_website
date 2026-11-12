import { Component, input } from '@angular/core';

/** Logotyp „Byte Hero” jako tekst w kolorach marki – ostry w każdej skali i w obu motywach. */
@Component({
  selector: 'app-logo',
  template: `
    <span [class]="'wordmark ' + size()" role="img" aria-label="Byte Hero"
      ><span class="l-red">B</span><span class="l-yellow">y</span><span class="l-green">t</span
      ><span class="l-blue">e</span>&ngsp;<span class="l-yellow">Hero</span></span
    >
  `,
  styles: `
    :host {
      display: inline-block;
      line-height: 1;
    }

    .wordmark {
      display: inline-block;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      letter-spacing: -0.01em;
      line-height: 1;
      white-space: nowrap;
    }

    .sm {
      font-size: 1.55rem;
    }

    .md {
      font-size: 2.25rem;
    }

    .lg {
      font-size: clamp(2.75rem, 7vw, 5.5rem);
    }

    .l-red {
      color: var(--brand-red);
    }

    .l-yellow {
      color: var(--logo-yellow);
    }

    .l-green {
      color: var(--brand-green);
    }

    .l-blue {
      color: var(--brand-blue);
    }
  `,
})
export class Logo {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
