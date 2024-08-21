import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
    <style scope=global>

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
    `

const markupString = /*html*/`<hr/>`

const scriptString = /*html*/`
<script type=module>
    // import CustomElement from "/_public/browser/custom-element.mjs"
    // class EHRule extends CustomElement {
    class EHRule extends HTMLElement {
        constructor() { super() }
        connectedCallback() {
          const isEnhanced = this.getAttribute('enhanced') === '✨'
          // client-side rendering
          if (!isEnhanced) {
            this.innerHTML = '<hr/>'
            this.setAttribute('enhanced', 'client')
          }
        }
        // render({ html, state }) { return html\`${markupString}\`}
    }
    if (!customElements.get('e-h-rule')) { customElements.define('e-h-rule',EHRule)}
</script>
`

const elementHTML = `
${styleString}
${markupString}
${scriptString}
`

const elementFunctionString = funWrapHTMLElement({ tag: 'e-h-rule', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-h-rule', styleString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
}

