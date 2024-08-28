import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/* Base styles */
hf-dot {
    display: inline-flex;
    align-items: center;

    &::before {
        content: "";
        width: 8px;
        height: 8px;
        margin: var(--hf-space-xs);
        border-radius: var(--hf-border-radius-full);
        background-color: var(--hf-color-gray-4);
    }

    /* Alert type */
    &[type="info"]::before {
        background-color: var(--hf-color-info-contrast);
    }
    &[type="success"]::before {
        background-color: var(--hf-color-success-contrast);
    }
    &[type="warn"]::before {
        background-color: var(--hf-color-warning-contrast);
    }
    &[type="error"]::before {
        background-color: var(--hf-color-error-contrast);
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-dot', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-dot', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
