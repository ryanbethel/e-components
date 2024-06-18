export default function AppLayout({ html }) {
  return html`
    <style>
      :host {
        --default-header-height: 4rem;
        --default-sidebar-transition: translate 0.25s cubic-bezier(.86,0,.07,1);
        --default-sidebar-min-width: 15rem;
        height: 100dvh;
        display: grid;
        grid-template-areas:
          'header'
          'sidebar'
          'main'
          'footer';
        grid-template-rows: min-content min-content 1fr min-content;
        overflow: hidden;
      }

      ::slotted([slot='header']) {
        grid-area: header;
        position: sticky;
        min-height: var(--layout-header-height, var(--default-header-height));
        top: 0;
      }

      ::slotted([slot='sidebar']) {
        grid-area: sidebar;
      }

      ::slotted([slot='footer']) {
        grid-area: footer;
      }

      @media only screen and (min-width:48em) {

        :host {
          display: grid;
          grid-template:
            'header header' min-content
            'sidebar main' 1fr
            'sidebar footer' min-content
            / var(--sidebar-min-width, var(--default-sidebar-min-width)) 1fr;
        }

        ::slotted([slot='header']) {
          grid-area: header;
          position: static;
        }

        ::slotted([slot='sidebar']) {
          position: static;
          translate: initial;
          transition: initial;
        }
      }
    </style>
    <slot name="header"></slot>
    <slot name="sidebar"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
  `
}
