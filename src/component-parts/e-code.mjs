import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
    <style scope="global">
      e-code {
        code {
          border-radius: var(--e-border-radius-md);
          background-color: var(--e-color-surface-well);
          color: var(--e-color-code-text);
          padding: 1px 3px;
        }

      }
    </style>
    `
const markupString = /*html*/`<code><slot></slot></code>`

// const scriptString = /*html*/`
// <script type=module>
//     import CustomElement from "/_public/browser/custom-element.mjs"
//     class ECode extends CustomElement {
//         constructor() { super() }
//         render({ html, state }) { return html\`${markupString}\`}
//     }
//     if (!customElements.get('e-code')) { customElements.define('e-code',ECode)}
// </script>
// `

const scriptString = /*html*/`
<script type=module>
    class ECode extends HTMLElement {
        constructor() { 
          super() 

          const isEnhanced = this.hasAttribute('enhanced')
          // client-side rendering
          if (!isEnhanced) {
            const code = this.querySelector('code')
            if (!code) {
                const code = document.createElement('code')
                const children = this.children
                for (let i = 0; i < children.length; i++) {
                    code.appendChild(children[i])
                }
                this.appendChild(code)
            }
          }
        }
    }
    if (!customElements.get('e-code')) { customElements.define('e-code',ECode)}
</script>
`



const elementHTML = `
${styleString}
${markupString}
${scriptString}
`

const elementFunctionString = funWrapHTMLElement({ tag: 'e-code', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-code', styleString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
}

