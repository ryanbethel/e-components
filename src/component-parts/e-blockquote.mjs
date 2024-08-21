import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope=global>
e-blockquote {
    blockquote {
        color: var(--e-color-surface-subtext);
        font-style: italic;
    }
}
</style>
`
const scriptString = /*html*/`
<script>
    class EBlockquote extends HTMLElement {
        constructor() { super() }
        connectedCallback() {
          const isEnhanced = this.getAttribute('enhanced') === '✨'
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
</script>
`

const markupString = /*html*/`<blockquote><slot></slot></blockquote>`


const elementHTML = `
${styleString}
${markupString}
${scriptString}
`

const elementFunctionString = funWrapHTMLElement({tag:'e-blockquote', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-blockquote',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 