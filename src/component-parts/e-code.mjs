import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*html*/`
 e-code {
   code {
     border-radius: var(--hf-border-radius-md);
     background-color: var(--hf-color-surface-well);
     color: var(--hf-color-code-text);
     padding: 1px 3px;
   }

 }
`
const markupString = /*html*/`<code><slot></slot></code>`

const scriptString = /*html*/`
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
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('hf-code')) { customElements.define('hf-code',ECode)}
`



const elementHTML = `
<style scope=global>
${indentChunk(cssString)}
</style>

${markupString}

<script type=module>
${indentChunk(scriptString)}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-code', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-code', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
}

