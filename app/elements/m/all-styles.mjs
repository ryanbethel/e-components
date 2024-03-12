export default function AllStyles({ html }) {
  return html`
<style scope="global">

/* custom-properties.css */
:root {
  /* Colors */
  --m-color-gray-1: #f8f8f8;
  --m-color-gray-2: #dedede;
  --m-color-gray-3: #ccc;
  --m-color-gray-4: #9c9c9c;
  --m-color-gray-5: #838383;
  --m-color-gray-6: #6e6e6e;
  --m-color-gray-7: #404040;
  --m-color-gray-8: #333;
  --m-color-gray-9: #282828;
  --m-color-blue-1: #d8ebfe;
  --m-color-blue-2: #6990ee;
  --m-color-blue-3: #494eaa;
  --m-color-red-1: #fce2de;
  --m-color-red-2: #eb6176;
  --m-color-red-3: #a2204f;
  --m-color-green-1: #ccf3ca;
  --m-color-green-2: #26a573;
  --m-color-green-3: #146146;
  --m-color-orange-1: #f6e5bb;
  --m-color-orange-2: #e36f4f;
  --m-color-orange-3: #963712;

  --m-color-disabled-fg: var(--m-color-gray-4);
  --m-color-disabled-bg: var(--m-color-gray-1);

  --m-color-focus: var(--m-color-blue-1);

  --m-color-primary-action: #157bb6;

  --m-color-primary-bg: white;
  --m-color-border: var(--m-color-gray-2);

  /* Borders */
  --m-border-radius-sm: 2px;
  --m-border-radius-md: 4px;
  --m-border-radius-full: 9999px;

  /* Other */
  --m-max-content-width: 1320px; /* The 16" MacBook Pro */
  --m-input-min-height: 34px;
  --m-target-min-size: 24px; /* WCAG Level AA minimum target recommendation is 24x24 */

  /* Spacing (loosely based on Divine Proportions) */
  --m-space-xs: 6px;
  --m-space-sm: 12px;
  --m-space-md: 18px;
  --m-space-lg: 30px;
  --m-space-xl: 48px;

  /* Breakpoints */
  --m-breakpoint-sm: 576px; /* and below is "phone" */
  --m-breakpoint-md: 768px; /* and below is "tablet" */
  --m-breakpoint-lg: 992px;

  /* Font */
  --m-font-size-min: 13px; /* WCAG recommendation */
  --m-font-size-default: 16px;
  --m-font-size-md: 18px;
  --m-font-size-lg: 24px;
  --m-font-size-xl: 32px;
}

/* End custom-properties.css */


/* normalize.css */
body {
  margin: 0;
  height: 100vh;
  box-sizing: border-box;
  color: var(--m-color-gray-7);
  font-family: 'Helvetica Neue', Arial;
}

/* The hidden attr has extremely low specificity because it's a User Agent style. This makes it work as expected. */
[hidden] { display: none !important; }
/* End of normalize.css */

/* Utility-classes.css */
/* CLASSES THAT MUST COME FIRST */
.all-unset { all: unset }

/* Spacing */
.pad-0 { padding: 0 }
.pad-xs { padding: var(--m-space-xs) }
.pad-sm { padding: var(--m-space-sm) }
.pad-md { padding: var(--m-space-md) }
.pad-lg { padding: var(--m-space-lg) }
.pad-xl { padding: var(--m-space-xl) }

.pad-t-0 { padding-top: 0 }
.pad-t-xs { padding-top: var(--m-space-xs) }
.pad-t-sm { padding-top: var(--m-space-sm) }
.pad-t-md { padding-top: var(--m-space-md) }
.pad-t-lg { padding-top: var(--m-space-lg) }
.pad-t-xl { padding-top: var(--m-space-xl) }

.pad-r-0 { padding-right: 0 }
.pad-r-xs { padding-right: var(--m-space-xs) }
.pad-r-sm { padding-right: var(--m-space-sm) }
.pad-r-md { padding-right: var(--m-space-md) }
.pad-r-lg { padding-right: var(--m-space-lg) }
.pad-r-xl { padding-right: var(--m-space-xl) }

.pad-b-0 { padding-bottom: 0 }
.pad-b-xs { padding-bottom: var(--m-space-xs) }
.pad-b-sm { padding-bottom: var(--m-space-sm) }
.pad-b-md { padding-bottom: var(--m-space-md) }
.pad-b-lg { padding-bottom: var(--m-space-lg) }
.pad-b-xl { padding-bottom: var(--m-space-xl) }

.pad-l-0 { padding-left: 0 }
.pad-l-xs { padding-left: var(--m-space-xs) }
.pad-l-sm { padding-left: var(--m-space-sm) }
.pad-l-md { padding-left: var(--m-space-md) }
.pad-l-lg { padding-left: var(--m-space-lg) }
.pad-l-xl { padding-left: var(--m-space-xl) }

.mar-auto { margin: auto }
.mar-0 { margin: 0 }
.mar-xs { margin: var(--m-space-xs) }
.mar-sm { margin: var(--m-space-sm) }
.mar-md { margin: var(--m-space-md) }
.mar-lg { margin: var(--m-space-lg) }
.mar-xl { margin: var(--m-space-xl) }

.mar-t-auto { margin-top: auto }
.mar-t-0 { margin-top: 0 }
.mar-t-xs { margin-top: var(--m-space-xs) }
.mar-t-sm { margin-top: var(--m-space-sm) }
.mar-t-md { margin-top: var(--m-space-md) }
.mar-t-lg { margin-top: var(--m-space-lg) }
.mar-t-xl { margin-top: var(--m-space-xl) }

.mar-r-auto { margin-right: auto }
.mar-r-0 { margin-right: 0 }
.mar-r-xs { margin-right: var(--m-space-xs) }
.mar-r-sm { margin-right: var(--m-space-sm) }
.mar-r-md { margin-right: var(--m-space-md) }
.mar-r-lg { margin-right: var(--m-space-lg) }
.mar-r-xl { margin-right: var(--m-space-xl) }

.mar-b-auto { margin-bottom: auto }
.mar-b-0 { margin-bottom: 0 }
.mar-b-xs { margin-bottom: var(--m-space-xs) }
.mar-b-sm { margin-bottom: var(--m-space-sm) }
.mar-b-md { margin-bottom: var(--m-space-md) }
.mar-b-lg { margin-bottom: var(--m-space-lg) }
.mar-b-xl { margin-bottom: var(--m-space-xl) }

.mar-l-auto { margin-left: auto }
.mar-l-0 { margin-left: 0 }
.mar-l-xs { margin-left: var(--m-space-xs) }
.mar-l-sm { margin-left: var(--m-space-sm) }
.mar-l-md { margin-left: var(--m-space-md) }
.mar-l-lg { margin-left: var(--m-space-lg) }
.mar-l-xl { margin-left: var(--m-space-xl) }

.gap-0 { gap: 0 }
.gap-xs { gap: var(--m-space-xs) }
.gap-sm { gap: var(--m-space-sm) }
.gap-md { gap: var(--m-space-md) }
.gap-lg { gap: var(--m-space-lg) }
.gap-xl { gap: var(--m-space-xl) }

/* Font */
.fnt-bold { font-weight: 700 }
.fnt-med { font-weight: 500}
.fnt-reg { font-weight: 400 }
.fnt-light { font-weight: 300 }
.fnt-normal { font-style: normal }
.fnt-italic { font-style: italic }
.fnt-mono { font-family: monospace }

/* Text */
.txt-left { text-align: left }
.txt-right { text-align: right }
.txt-center { text-align: center }
.txt-justify { text-align: justify }
.txt-lower { text-transform: lowercase }
.txt-upper { text-transform: uppercase }
.txt-caps { text-transform: capitalize }
.txt-space { letter-spacing: 2px }
.txt-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.txt-nowrap { white-space: nowrap }
.txt-break-all { word-break: break-all }
.txt-break-word { word-break: break-word }
.txt-maxlength { max-width: 75ch }
.txt-noselect { user-select: none; cursor: default; }
.txt-xs { font-size: var(--m-font-size-min)}
.txt-sm { font-size: var(--m-font-size-default)}
.txt-md { font-size: var(--m-font-size-md)}
.txt-lg { font-size: var(--m-font-size-lg)}
.txt-xl { font-size: var(--m-font-size-xl)}
.txt-xxl { font-size: 100px }
.txt-white { color: #fff }
.txt-gray-1 { color: var(--m-color-gray-1) }
.txt-gray-2 { color: var(--m-color-gray-2) }
.txt-gray-3 { color: var(--m-color-gray-3) }
.txt-gray-4 { color: var(--m-color-gray-4) }
.txt-gray-5 { color: var(--m-color-gray-5) }
.txt-gray-6 { color: var(--m-color-gray-6) }
.txt-gray-7 { color: var(--m-color-gray-7) }
.txt-gray-8 { color: var(--m-color-gray-8) }
.txt-gray-9 { color: var(--m-color-gray-9) }
.txt-blue-1 { color: var(--m-color-blue-1) }
.txt-blue-2 { color: var(--m-color-blue-2) }
.txt-blue-3 { color: var(--m-color-blue-3) }
.txt-red-1 { color: var(--m-color-red-1) }
.txt-red-2 { color: var(--m-color-red-2) }
.txt-red-3 { color: var(--m-color-red-3) }
.txt-green-1 { color: var(--m-color-green-1) }
.txt-green-2 { color: var(--m-color-green-2) }
.txt-green-3 { color: var(--m-color-green-3) }
.txt-orange-1 { color: var(--m-color-orange-1) }
.txt-orange-2 { color: var(--m-color-orange-2) }
.txt-orange-3 { color: var(--m-color-orange-3) }
.txt-info { color: var(--m-color-blue-2) }
.txt-success { color: var(--m-color-green-2) }
.txt-warn { color: var(--m-color-orange-2) }
.txt-error { color: var(--m-color-red-2) }

/* Display */
.grid { display: grid }
.inline-grid { display: inline-grid }
.flex { display: flex }
.inline-flex { display: inline-flex }
.block { display: block }
.inline-block { display: inline-block }
.inline { display: inline }
.hidden { display: none }

/* Flexbox */
.flx-grow-0 { flex-grow: 0 }
.flx-grow-1 { flex-grow: 1 }
.flx-shrink-0 { flex-shrink: 0 }
.flx-shrink-1 { flex-shrink: 1 }
.flx-basis-content { flex-basis: content }
.flx-wrap { flex-wrap: wrap }
.flx-row { flex-direction: row }
.flx-col { flex-direction: column }
.justify-content-start { justify-content: flex-start }
.justify-content-center { justify-content: center }
.justify-content-between { justify-content: space-between }
.justify-content-evenly { justify-content: space-evenly }
.justify-content-around { justify-content: space-around }
.justify-content-end { justify-content: flex-end }
.align-items-start { align-items: flex-start}
.align-items-center { align-items: center}
.align-items-end { align-items: flex-end }
.align-self-stretch { align-self: stretch }
.align-self-start { align-self: start }
.align-self-center { align-self: center }
.align-self-end { align-self: flex-end }
.place-content-center { place-content: center }

/* Float */
.left { float: left }
.right { float: right }
.clear { clear: both }

/* Position */
.pos-absolute { position: absolute }
.pos-fixed { position: fixed }
.pos-relative { position: relative }
.pos-static { position: static }
.pos-sticky { position: sticky }
.pos-t-0 { top: 0 }
.pos-r-0 { right: 0 }
.pos-b-0 { bottom: 0 }
.pos-l-0 { left: 0 }

/* Borders */
.brd-none { border: none }
.brd { border: 1px solid var(--m-color-border) }
.brd-t { border-top: 1px solid var(--m-color-border) }
.brd-r { border-right: 1px solid var(--m-color-border) }
.brd-b { border-bottom: 1px solid var(--m-color-border) }
.brd-l { border-left: 1px solid var(--m-color-border) }
.brd-radius-sm { border-radius: var(--m-border-radius-sm) }
.brd-radius-md { border-radius: var(--m-border-radius-md) }
.brd-radius-full { border-radius: var(--m-border-radius-full) }
.brd-dashed { border-style: dashed }
.brd-sm { border-width: 1px }
.brd-md { border-width: 2px }

/* Backgrounds */
.bg-clip-text { background-clip: text; color: transparent }
.bg-cover {background-size: cover }
.bg-contain {background-size: contain }
.bg-white { background: #fff }
.bg-gray-1 { background: var(--m-color-gray-1) }
.bg-gray-2 { background: var(--m-color-gray-2) }
.bg-gray-3 { background: var(--m-color-gray-3) }
.bg-gray-4 { background: var(--m-color-gray-4) }
.bg-gray-5 { background: var(--m-color-gray-5) }
.bg-gray-6 { background: var(--m-color-gray-6) }
.bg-gray-7 { background: var(--m-color-gray-7) }
.bg-gray-8 { background: var(--m-color-gray-8) }
.bg-gray-9 { background: var(--m-color-gray-9) }
.bg-blue-1 { background: var(--m-color-blue-1) }
.bg-blue-2 { background: var(--m-color-blue-2) }
.bg-blue-3 { background: var(--m-color-blue-3) }
.bg-red-1 { background: var(--m-color-red-1) }
.bg-red-2 { background: var(--m-color-red-2) }
.bg-red-3 { background: var(--m-color-red-3) }
.bg-green-1 { background: var(--m-color-green-1) }
.bg-green-2 { background: var(--m-color-green-2) }
.bg-green-3 { background: var(--m-color-green-3) }
.bg-orange-1 { background: var(--m-color-orange-1) }
.bg-orange-2 { background: var(--m-color-orange-2) }
.bg-orange-3 { background: var(--m-color-orange-3) }
.bg-info { background: var(--m-color-blue-2) }
.bg-success { background: var(--m-color-green-2) }
.bg-warn { background: var(--m-color-orange-2) }
.bg-error { background: var(--m-color-red-2) }

/* Other */
.pointer { cursor: pointer }
.height-full { height: 100% }
.height-half { height: 50% }
.height-min-0 { min-height: 0 }
.width-full { width: 100% }
.width-half { width: 50% }
.width-fit { width: fit-content }
.width-min-0 { min-width: 0 }
.shadow { box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3) }
.vis-hidden { visibility: hidden }
.overflow-auto { overflow: auto }
.overflow-hidden { overflow: hidden }
.overflow-clip { overflow: clip }
.box-sizing-border { box-sizing: border-box }
.box-sizing-content { box-sizing: content-box }
.content-vis-auto { content-visibility: auto }
/* End utility-classes.css */
</style>
`}
