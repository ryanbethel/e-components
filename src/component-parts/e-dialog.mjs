import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope="global">
    e-dialog {
        /* Base dialog styles */
        & dialog {
            border: none;
            padding: var(--e-space-lg);
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
</style>
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
${styleString}
${markupString}
`

const elementFunctionString = funWrapHTMLElement({tag:'e-dialog', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-dialog',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 