import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
    <style scope="global">
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
        `
const markupString = /*html*/`<pre><slot></slot></pre>`

const scriptString = /*html*/`
<script>
    class ECodeBlock extends HTMLElement {
        constructor() { super() }
        connectedCallback() {
          const isEnhanced = this.getAttribute('enhanced') === '✨'
          // client-side rendering
          if (!isEnhanced) {
            const pre = this.querySelector('pre')
            if (!pre) {
                const pre = document.createElement('pre')
                const children = this.children
                for (let i = 0; i < children.length; i++) {
                    pre.appendChild(children[i])
                }
                this.appendChild(pre)
            }
            this.setAttribute('enhanced', 'client')
          }
        }
    }
</script>
`



const elementHTML = `
${styleString}
${markupString}
${scriptString}
`

const elementFunctionString = funWrapHTMLElement({tag:'e-code-block', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-code-block',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 


