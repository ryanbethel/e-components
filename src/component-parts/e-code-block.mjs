import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
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
`

const markupString = /*html*/`<pre><slot></slot></pre>`

const scriptString = /*javascript*/`
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
if (!customElements.get('e-code-block')) { customElements.define('e-code-block',ECodeBlock)}
}
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

const elementFunctionString = funWrapHTMLElement({ tag: 'e-code-block', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-code-block', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
}


