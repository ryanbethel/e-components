import CustomElement from '@enhance/custom-element'

export default class Code extends CustomElement {
    render({ html, state }) {
        return html`    <style scope="global">
      e-code {
        code {
          border-radius: var(--e-border-radius-md);
          background-color: var(--e-color-surface-well);
          color: var(--e-color-code-text);
          padding: 1px 3px;
        }

      }
    </style>

    <code><slot></slot></code>

`
    }
}

if (!customElements.get("e-code")) { customElements.define("e-code", Code) };
