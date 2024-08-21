import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope="global">
    /* Inspired by Flexbox Grid https://github.com/kristoferjoseph/flexboxgrid */
    e-row {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--e-space-md);

        & + & {
            margin-top: var(--e-space-md);
        }

        /* Centers columns inside the row */
        &[center] {
            justify-content: center;

            & e-col:not([span]) {
                flex-grow: inherit;
                flex-basis: inherit;
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

const elementFunctionString = funWrapHTMLElement({tag:'e-row', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-row',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
