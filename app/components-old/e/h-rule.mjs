import CustomElement from '@enhance/custom-element'

export default class Hrule extends CustomElement {
    render({ html, state }) {
        return html`    <style scope=global>

      e-h-rule { 
        display: block; 

        hr {
          background-color: var(--e-color-gray-3);
          border: none;
          margin: 0;
          height: 1px;
        }

      }
    </style>
    <hr/>
`
    }
}

if (!customElements.get("e-h-rule")) { customElements.define("e-h-rule", Hrule) };
