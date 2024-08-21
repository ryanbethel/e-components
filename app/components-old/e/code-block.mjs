import CustomElement from '@enhance/custom-element'

export default class Codeblock extends CustomElement {
    render({ html, state }) {
        return html`    <style scope="global">
      /* Base code styles */
      e-code {
        pre {
          border-radius: var(--e-border-radius-md);
          background-color: var(--e-color-surface-well);
          color: var(--e-color-code-text);
          margin: 0;
          padding: var(--e-space-xs) var(--e-space-sm);
        }
      }
    </style>

    <pre><slot></slot></pre>

`
    }
}

if (!customElements.get("e-code-block")) { customElements.define("e-code-block", Codeblock) };
