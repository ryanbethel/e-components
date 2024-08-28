import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
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
`

const markupString = /*html*/`<hr aria-orientation="vertical" />`

const scriptString = /*javascript*/`
class EVRule extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        this.innerHTML = '<hr aria-orientation="vertical" />'
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('e-v-rule')) { customElements.define('e-v-rule', EVRule) }
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

const elementFunctionString = funWrapHTMLElement({ tag: 'e-v-rule', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-v-rule', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
