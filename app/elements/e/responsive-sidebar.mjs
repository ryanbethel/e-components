export default function eNavBar({ html }) {
  return html`

<style>

  :host {
    display: block;
    --default-sidebar-transition: translate 0.25s cubic-bezier(.86,0,.07,1);
    --default-header-height: 3rem;
    --default-header-background-color: var(--e-color-gray-2);
    --default-header-color: currentColor;
  }

  [slot=logo] {
    width:1.5rem;
    height:1.5rem;
    margin-inline-end:1rem;
  }

  header > e-row {
    background-color: var(--e-header-bg-color, var(--default-header-background-color));
    color: var(--e-header-color, var(--default-header-color));
    padding-inline: 1rem;
    justify-items:center;
  }

  .mobile-opener {
    margin-inline-end:1rem;
    display:flex;
    position:relative;
    width:1.5rem;
    height:1.5rem;
    justify-content:flex-end;
    align-items:center;
  }

 .mobile-opener input[type=checkbox] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .mobile-opener label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
  }

  header:has(.mobile-opener input[type='checkbox']:checked) ~ e-row > e-col.sidebar {
    translate: 0 0;
  }

  .nav-menu  {
    background-color: var(--e-header-bg-color, var(--default-header-background-color));
    display:flex;
  }
  .nav-menu > * {
    display:flex;
    justify-content:flex-end;
    align-items:center;
    flex-direction:row;
  }
  .nav-menu > * > * {
    padding-inline: 1rem;
    padding-block: 0;
  }

  @media only screen and (min-width:1096px) {

    .mobile-opener {
      display:none;
    }
  }

  [aria-current] {
    border-bottom: 2px solid var(--e-color-primary-action);
  }

  header e-col {
    display:flex;
    align-items:center;
  }
  header e-col + e-col {
    justify-content:flex-end;
  }

  .sidebar {
    position: fixed;
    top: var(--e-header-height, var(--default-header-height));
    right: 0; /* 50vw for half screen */
    bottom: 0;
    left: 0;
    translate: -100% 0;
    transition: var(--layout-sidebar-transition, var(--default-sidebar-transition));
    background-color: var(--e-header-bg-color, var(--default-header-background-color));
    z-index: 1000;
    border-right: 1px solid var(--e-color-gray-3);
  }

  .sidebar.sidebar {
    max-width:100%;
  }

  @media only screen and (min-width:1096px) {
    .sidebar {
      translate: initial;
      transition: initial;
      position:static;
      display:flex;
      border-right: 0px ;
    }
    .sidebar.sidebar {
      max-width: calc(100% * 2/12);
    }
  }

  /* .sidebar > * { */
  /*   display:flex; */
  /*   justify-content:flex-start; */
  /*   align-items:flex-start; */
  /*   flex-direction:column; */
  /* } */
  /* .sidebar > * { */
  /*   display:flex; */
  /*   justify-content:flex-end; */
  /*   align-items:center; */
  /*   flex-direction:row; */
  /* } */
  /* .sidebar > * > * { */
  /*   padding-inline: 1rem; */
  /*   padding-block: 1rem; */
  /* } */
  /* .sidebar > * > * { */
  /*   padding-inline: 1rem; */
  /*   padding-block: 0; */
  /* } */

  :host:has(e-row > e-col.sidebar > [slot=sidebar]:empty) > header .mobile-opener {
    display:none;
  }

  [slot=domain] {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    min-height:1em;
  }
</style>

<header>
  <e-row>
    <e-col>
        <nav class="mobile-opener">
          <input type="checkbox">
          <label for="nav-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
          </label>
        </nav>
      <slot name=logo></slot>
      <slot name=domain></slot>
    </e-col>
    <e-col>
        <nav class="nav-menu">
          <slot name=nav-items as=div>
          </slot>
        </nav>
    </e-col>
  </e-row>
</header>
<e-seperator></e-seperator>
<e-row>
  <e-col span=2 class=sidebar>
    <slot name=sidebar></slot>
  </e-col>
  <e-col>
    <slot name=main></slot>
  </e-col>
</e-row>
`
}

