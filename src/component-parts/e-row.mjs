import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/* Inspired by Flexbox Grid https://github.com/kristoferjoseph/flexboxgrid */
hf-row {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--hf-space-md);

    & + & {
        margin-top: var(--hf-space-md);
    }

    /* Centers columns inside the row */
    &[center] {
        justify-content: center;

        & hf-col:not([span]) {
            flex-grow: inherit;
            flex-basis: inherit;
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-row', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-row', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
