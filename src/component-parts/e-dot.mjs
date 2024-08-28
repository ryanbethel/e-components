import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/* Base styles */
e-dot {
    display: inline-flex;
    align-items: center;

    &::before {
        content: "";
        width: 8px;
        height: 8px;
        margin: var(--e-space-xs);
        border-radius: var(--e-border-radius-full);
        background-color: var(--e-color-gray-4);
    }

    /* Alert type */
    &[type="info"]::before {
        background-color: var(--e-color-info-contrast);
    }
    &[type="success"]::before {
        background-color: var(--e-color-success-contrast);
    }
    &[type="warn"]::before {
        background-color: var(--e-color-warning-contrast);
    }
    &[type="error"]::before {
        background-color: var(--e-color-error-contrast);
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

const elementFunctionString = funWrapHTMLElement({ tag: 'e-dot', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-dot', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
