import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
e-switch {
  /* Base switch styles */
  input[is=switch] {
    position: relative;
    width: 40px;
    height: 22px;
    appearance: none;
    margin: 0;
    border-radius: var(--e-border-radius-full);
    cursor: pointer;
    background-color: var(--e-color-gray-3);
    transition: background-color ease-in 0.12s;

    &::before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      top: 3px;
      left: 3px;
      border-radius: var(--e-border-radius-full);
      background-color: white;
      transition: all ease-in 0.12s;
    }

    &:focus-visible {
      outline: 2px solid var(--e-color-focus);
      outline-offset: 0;
    }

    /* Checked state */
    &:checked { background-color: var(--e-color-primary) }
    &:checked:before { left: 20px }

    /* Disabled state */
    &:disabled {
      cursor: not-allowed;
      background-color: var(--e-color-disabled-bg);
    }
  }
}
`
const markupString = /*html*/`<slot><input is=switch type=checkbox /></slot>`

const scriptString = /*html*/`
class ESwitch extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        if (!this.children.length) {
          this.innerHTML = '<input is=switch type=checkbox />'
        }
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('e-switch')) { customElements.define('e-switch', ESwitch) }
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

const elementFunctionString = funWrapHTMLElement({ tag: 'e-switch', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-switch', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
}

