export default function responsiveSidebar({ html, state }) {
  return html`

<style>
  :host {
    --default-sidebar-transition: translate 0.25s cubic-bezier(.86,0,.07,1);
    --default-header-height: 3.5em;
    --back: #f9f9f9;
  }

  [slot='sidebar'] {
    position: fixed;
    top: var(--layout-header-height, var(--default-header-height));
    right: 500px;
    bottom: 0;
    left: 0;
    translate: -100% 0;
    transition: var(--layout-sidebar-transition, var(--default-sidebar-transition));
    background-color: var(--back);
  }

  [slot='header']:has(input[type='checkbox']:checked) ~ [slot='sidebar'] {
    translate: 0 0;
  }

  :host {
    display:grid;
    grid-template-areas: "header" "main";
    grid-template-columns: 1fr ;
    grid-template-rows: 1fr ;
  }
  [slot='header'] {
    grid-area:header;
  }
  [slot='main'] {
    grid-area:main;
  }
  [slot='sidebar'] {
    grid-area:sidebar;
  }

  @media only screen and (min-width:1096px) {
    [slot='sidebar'] {
      translate: initial;
      transition: initial;
      position:static;
    }

    :host {
      grid-template-areas: "header header" "sidebar main";
      grid-template-columns: 100px auto;
    }
  }
</style>
<slot name="header"></slot>
<slot name="main"></slot>
<slot name="sidebar"></slot>
`
}
