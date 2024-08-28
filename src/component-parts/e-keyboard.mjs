import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
e-keyboard {
    kbd {
        font-family: system-ui;

        &:not(:has(kbd)),
        & kbd {
            border-radius: 3px;
            box-shadow: 0 1px 2px 0 var(--e-color-gray-5);
            padding: 0 4px;
            background: white;
        }
    }
}
`

const markupString = /*html*/`<kbd><slot></slot></kbd>`

const scriptString = /*javascript*/`
class EKeyboard extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        const kbd = this.querySelector('kbd')
        if (!kbd) {
            const kbd = document.createElement('kbd')
            const children = this.children
            for (let i = 0; i < children.length; i++) {
                kbd.appendChild(children[i])
            }
            this.appendChild(kbd)
        }
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('e-keyboard')) { customElements.define('e-keyboard',EKeyboard)}
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

const elementFunctionString = funWrapHTMLElement({ tag: 'e-keyboard', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-keyboard', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
}

