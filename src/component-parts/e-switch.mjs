import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
  <style scope="global">
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
  </style>
    `
const markupString = /*html*/`<slot><input is=switch type=checkbox /></slot>`

const scriptString = /*html*/`
<script>
    class ESwitch extends HTMLElement {
        constructor() { super() }
        connectedCallback() {
          const isEnhanced = this.getAttribute('enhanced') === '✨'
          // client-side rendering
          if (!isEnhanced) {
            if (!this.children.length) {
              this.innerHTML = '<input is=switch type=checkbox />'
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

const elementFunctionString = funWrapHTMLElement({tag:'e-switch', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-switch',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 

