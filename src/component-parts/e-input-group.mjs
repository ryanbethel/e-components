import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
  hf-input-group { 
    display: block;

    & + & {
      margin-top: var(--hf-space-xs);
    }

    & + :is(&, hf-button, button[ord], a[role=button]) { margin-top: var(--hf-space-md) }

    fieldset {
      margin: 0;
      padding: 0;
      border: none;
      position: relative;

      & + :is(&, button[ord], a[role=button]) { margin-top: var(--hf-space-md) }

      & input:not([type=radio]):not([type=checkbox]),
      & :is(label, select) {
        display: block;
      }

      & input + label { display: inline }

      & :is(label, legend) { font-weight: 500 }

      & :is(input[type=radio], input[type=checkbox]) + label {
        font-weight: normal;
      }

      & :is(input, textarea) { box-sizing: border-box }

      & input:not([type=radio], [type=checkbox], [type=range]),
      & :is(select, textarea) {
        width: 100%;
        min-height: var(--hf-input-min-height);
        font-size: var(--hf-font-size-default);
        padding: 6px;
        border-radius: 0px;
        background-color: var(--hf-color-gray-0);
        color: var(--hf-color-gray-8);
      }

      & :is(input:not([is=switch]), select, textarea) {
        border: 1px solid var(--hf-color-gray-3);
      }

      & select:not([multiple]) {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' height='10px' width='22px'%3E%3Ctext x='0' y='10' fill='gray'%3E%E2%96%BE%3C/text%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right center;
        padding-right: var(--hf-space-lg);
      }

      & textarea {
        resize: vertical;
        font-family: inherit;
      }

      & input[type=range] {
        appearance: none;
        outline: 0;
        width: 100%;
        margin: var(--hf-space-sm) 0;
        height: var(--hf-space-xs);
        background-color: var(--hf-color-gray-3);
        border-radius: var(--hf-border-radius-full);

        &::-webkit-slider-thumb {
           appearance: none;
           width: var(--hf-space-md);
           height: var(--hf-space-md);
           border: 1px solid var(--hf-color-gray-4);
           background-color: white;
           border-radius: var(--hf-border-radius-full);

          &:focus-visible {
             outline: 2px solid var(--hf-color-focus);
          }
        }

        /*&[orient=vertical] {*/
        /*  transform: rotate(-90deg);*/
        /*  position: absolute;*/
        /*  top: 48%;*/
        /*  left: -78%;*/
        /*  margin: 0;*/
        /*}*/
      }

      & :is(label, input, select, textarea, small) {
        & + & {
          margin-top: var(--hf-space-xs);
        }
      }

      & input:not([type=range]):not([is=switch]),
      & :is(select, textarea) {
        &:focus {
          outline: 2px solid var(--hf-color-focus);
          outline-offset: 0;
          border: 1px solid var(--hf-color-primary);
        }
      }

      & :is(input, select, textarea) {
        &:invalid,
        &[invalid] {
          border-color: var(--hf-color-error);

          & ~ small {
            color: var(--hf-color-error);
          }
        }

        & ~ small {
          color: var(--hf-color-gray-6);
        }
      }

    }
  }
    `

const markupString = /*html*/`
<fieldset>
  <slot></slot>
</fieldset>`

const scriptString = /*javascript*/`
class EInputGroup extends HTMLElement {
    constructor() { super() }
    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        // should only one child and it is a fieldset once expanded
        if (this.children.length !== 1 || this.children[0].tagName !== 'FIELDSET') {
            const fieldset = document.createElement('fieldset')
            const children = this.children
            for (let i = 0; i < children.length; i++) {
                fieldset.appendChild(children[i])
            }
            this.appendChild(fieldset)
        }
        this.setAttribute('enhanced', 'client')
      }
    }
}
if (!customElements.get('hf-input-group')) { customElements.define('hf-input-group',EInputGroup)}
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-input-group', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-input-group', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
}

