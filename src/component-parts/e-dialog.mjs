import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-dialog {
    /* Base dialog styles */
    & dialog {
        border: none;
        padding: var(--hf-space-lg);
        background-color: #f5f3f7;
        box-shadow: 0 16px 18px -3px #858585;

        /* Close button */
        & button[slot="close"][type="remove"] {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
}
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
<style scope="global">
${indentChunk(cssString)}
</style>
${markupString}
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-dialog', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-dialog', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
