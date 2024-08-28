import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
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
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
<style scope="global">
${indentChunk(cssString)}
</style>
${markupString}
`

const elementFunctionString = funWrapHTMLElement({ tag: 'e-tag', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-tag', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
