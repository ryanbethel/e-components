import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope="global">
    e-tag {
        display: inline-flex;
        align-items: center;
        color: var(--e-color-tag-text, currentColor);
        /* border: 1px solid var(--color, currentColor); */
        border: 1px solid currentColor;
        background-color: var(--e-color-tag, var(--e-color-gray-3));
        padding: 3px var(--e-space-xs);
        font-size: var(--e-font-size-min);

        & + & {
            margin-left: 3px;
        }

        /* Removable tag */
      & :is(e-button:has(button[type="remove"]), button[type=remove]) {
            padding-left: var(--e-space-xs);
            font-size: var(--e-font-size-default);
            width: auto;
        }
    }
</style>
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
${styleString}
${markupString}
`

const elementFunctionString = funWrapHTMLElement({tag:'e-tag', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-tag',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 