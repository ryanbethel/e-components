import CustomElement from '@enhance/custom-element'

export default class Sidebar extends CustomElement {
    render({ html, state }) {
        return html`<style>
  :root {
    --default-sidebar-transition: translate 0.25s cubic-bezier(.86,0,.07,1);
  }

  [slot='sidebar'] {
    position: fixed;
    top: var(--layout-header-height, var(--default-header-height));
    right: 0;
    bottom: 0;
    left: 0;
    translate: -100% 0;
    transition: var(--layout-sidebar-transition, var(--default-sidebar-transition));
    background-color: var(--back);
  }

  [slot='header']:has(input[type='checkbox']:checked) + [slot='sidebar'] {
    translate: 0 0;
  }

  @media only screen and (min-width:48em) {

    [slot='sidebar'] {
      translate: initial;
      transition: initial;
    }

  }
</style>
<layout-app>
  <app-header slot="header"></app-header>
  <app-sidebar slot="sidebar"></app-sidebar>
  <main slot="main">
    Here is some stuff
  </main>
  <app-footer slot="footer">
    footer
  </app-footer>
</layout-app>
`
    }
}

if (!customElements.get("e-sidebar")) { customElements.define("e-sidebar", Sidebar) };
