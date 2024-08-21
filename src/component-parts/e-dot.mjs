import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope="global">
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
</style>
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
${styleString}
${markupString}
`

const elementFunctionString = funWrapHTMLElement({tag:'e-dot', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-dot',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 