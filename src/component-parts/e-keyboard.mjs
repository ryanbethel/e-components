import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope="global">
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
</style>
    `

const markupString = /*html*/`<kbd><slot></slot></kbd>`

const scriptString = /*html*/`
<script>
    class EKeyboard extends HTMLElement {
        constructor() { super() }
        connectedCallback() {
          // client-side rendering
          if (!isEnhanced) {
            const kbd = this.querySelector('kbd')
            if (!blockquote) {
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
</script>
`

const elementHTML = `
${styleString}
${markupString}
${scriptString}
`

const elementFunctionString = funWrapHTMLElement({tag:'e-keyboard', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-keyboard',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 

