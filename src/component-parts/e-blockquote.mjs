import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-blockquote {
    blockquote {
        color: var(--hf-color-surface-subtext);
        font-style: italic;
    }
}
`
const scriptString = /*javascript*/`
class EBlockquote extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        const blockquote = this.querySelector('blockquote')
        if (!blockquote) {
            const blockquote = document.createElement('blockquote')
            const children = this.children
            for (let i = 0; i < children.length; i++) {
                blockquote.appendChild(children[i])
            }
            this.appendChild(blockquote)
        }
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('hf-blockquote')) {customElements.define('hf-blockquote', EBlockquote);}
`

const markupString = /*html*/`<blockquote><slot></slot></blockquote>`


const elementHTML = `
<style scope=global>
${indentChunk(cssString)}
</style>

${markupString}

<script type=module>
${indentChunk(scriptString)}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-blockquote', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-blockquote', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
