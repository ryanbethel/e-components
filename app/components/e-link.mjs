import CustomElement from '@enhance/custom-element'

  export default class Link extends CustomElement {
      render({ html, state }) {
          return html`<style scope=global>
  e-link {
    /* Base link styles */
    a, *[role=link] {
      text-decoration: none;
      color: var(--e-color-primary-action);
      cursor: pointer;

      /*:is(a, span[role=link]):visited { color: var(--e-color-primary-action) }*/
      &:hover,
      &:focus-visible {
        text-decoration: underline;
        outline: 0;
      }

      /* Disabled state */
      &[disabled] {
        color: var(--e-color-disabled-fg);
        pointer-events: none;
      }
    }
  }
</style>
<slot></slot>

`
      }
  }

  customElements.define("e-link", Link);
