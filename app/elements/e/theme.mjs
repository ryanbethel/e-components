export default function Theme({ html, state }) {
    return html`
  <style scope="global">
        :root {
  /* Colors */
  --e-color-gray-1: #f8f8f8;
  --e-color-gray-2: #dedede;
  --e-color-gray-3: #ccc;
  --e-color-gray-4: #9c9c9c;
  --e-color-gray-5: #838383;
  --e-color-gray-6: #6e6e6e;
  --e-color-gray-7: #404040;
  --e-color-gray-8: #333;
  --e-color-gray-9: #282828;
  --e-color-blue-1: #d8ebfe;
  --e-color-blue-2: #6990ee;
  --e-color-blue-3: #494eaa;
  --e-color-red-1: #fce2de;
  --e-color-red-2: #eb6176;
  --e-color-red-3: #a2204f;
  --e-color-green-1: #ccf3ca;
  --e-color-green-2: #26a573;
  --e-color-green-3: #146146;
  --e-color-orange-1: #f6e5bb;
  --e-color-orange-2: #e36f4f;
  --e-color-orange-3: #963712;

  --e-color-disabled-fg: var(--e-color-gray-4);
  --e-color-disabled-bg: var(--e-color-gray-1);

  --e-color-focus: var(--e-color-blue-1);

  --e-color-primary-action: #157bb6;

  --e-color-primary-bg: white;
  --e-color-border: var(--e-color-gray-2);

  /* Borders */
  --e-border-radius-sm: 2px;
  --e-border-radius-md: 4px;
  --e-border-radius-full: 9999px;

  /* Other */
  --e-max-content-width: 1320px; /* The 16" MacBook Pro */
  --e-input-min-height: 34px;
  --e-target-min-size: 24px; /* WCAG Level AA minimum target recommendation is 24x24 */

  /* Spacing (loosely based on Divine Proportions) */
  --e-space-xs: 6px;
  --e-space-sm: 12px;
  --e-space-md: 18px;
  --e-space-lg: 30px;
  --e-space-xl: 48px;

  /* Breakpoints */
  --e-breakpoint-sm: 576px; /* and below is "phone" */
  --e-breakpoint-md: 768px; /* and below is "tablet" */
  --e-breakpoint-lg: 992px;

  /* Font */
  --e-font-size-min: 13px; /* WCAG recommendation */
  --e-font-size-default: 16px;
  --e-font-size-md: 18px;
  --e-font-size-lg: 24px;
  --e-font-size-xl: 32px;
}

:root e-theme[theme=red] {
  /* Colors */
  --e-color-gray-1: #FF0000;
  --e-color-gray-2: #FF0000;
  --e-color-gray-3: #FF0000;
  --e-color-gray-4: #FF0000;
  --e-color-gray-5: #FF0000;
  --e-color-gray-6: #FF0000;
  --e-color-gray-7: #FF0000;
  --e-color-gray-8: #FF0000;
  --e-color-gray-9: #FF0000;
  --e-color-blue-1: #FF0000;
  --e-color-blue-2: #FF0000;
  --e-color-blue-3: #FF0000;
  --e-color-red-1: #FF0000;
  --e-color-red-2: #FF0000;
  --e-color-red-3: #FF0000;
  --e-color-green-1: #FF0000;
  --e-color-green-2: #FF0000;
  --e-color-green-3: #FF0000;
  --e-color-orange-1: #FF0000;
  --e-color-orange-2: #FF0000;
  --e-color-orange-3: #FF0000;
}


/* End custom-properties.css */
</style>
<slot></slot>
`
}
