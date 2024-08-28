import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-box {
    display: block;
    border-radius: var(--hf-border-radius-md);
    padding: var(--hf-space-md);
    background-color: var(--hf-color-elevated-surface);
    color: var(--hf-color-surface-text);
    border: 1px solid var(--hf-color-border);

    /*
    The ord attr is short for "ordinal" as in "ordinal number word".
    Ordinal number words are the 10+ words used for describing the
    precedence or importance of an item in an ordered list.
    */

    &[ord="secondary"] {
        border: none;
        background-color: var(--hf-color-well-surface);
        box-shadow: 0px 1px 2px var(--hf-color-gray-3) inset;
        color: var(--hf-color-surface-text);
    }

    & > header {
        border-top-left-radius: var(--hf-border-radius-md);
        border-top-right-radius: var(--hf-border-radius-md);
    }

    & + & {
        margin-top: var(--hf-space-md);
    }
}

@media only screen and (max-width: 600px) {
    hf-box {
        padding: var(--hf-space-sm);
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-box', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-box', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
