import CustomElement from '@enhance/custom-element'

export default class Vrule extends CustomElement {
    render({ html, state }) {
        return html`    <style scope=global>

      e-v-rule { 
          display:flex;
          height:  auto;

        hr {
          background-color: var(--e-color-gray-3);
          border: none;
          margin: 0;
            width: 1px;
            height: auto;
        }
      }
    </style>
    <hr aria-orientation="vertical" />`
    }
}

if (!customElements.get("e-v-rule")) { customElements.define("e-v-rule", Vrule) };
