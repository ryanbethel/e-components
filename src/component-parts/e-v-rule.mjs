import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope=global>
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
`

const markupString = /*html*/`<hr aria-orientation="vertical" />`

const scriptString = /*html*/`
<script>
    class EBlockquote extends HTMLElement {
        constructor() { super() }
        connectedCallback() {
          const isEnhanced = this.getAttribute('enhanced') === '✨'
          // client-side rendering
          if (!isEnhanced) {
            this.innerHTML = '<hr aria-orientation="vertical" />'
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

const elementFunctionString = funWrapHTMLElement({tag:'e-v-rule', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-v-rule',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
