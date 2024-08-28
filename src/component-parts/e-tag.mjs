import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-tag {
    display: inline-flex;
    align-items: center;
    color: var(--hf-color-tag-text, currentColor);
    /* border: 1px solid var(--color, currentColor); */
    border: 1px solid currentColor;
    background-color: var(--hf-color-tag, var(--hf-color-gray-3));
    padding: 3px var(--hf-space-xs);
    font-size: var(--hf-font-size-min);

    & + & {
        margin-left: 3px;
    }

    /* Removable tag */
  & :is(hf-button:has(button[type="remove"]), button[type=remove]) {
        padding-left: var(--hf-space-xs);
        font-size: var(--hf-font-size-default);
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-tag', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-tag', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
