import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/* Base container styles */
e-container {
    display: block;
    max-width: var(--e-max-content-width);
    margin: auto;
    padding: var(--e-space-md) var(--e-space-lg);

    /* Sizes */
    &[maxwidth="md"] {
        max-width: calc(38.5 * var(--e-space-lg));
    } /* Plus its margin = 960 which is a very comfortable and common size */
    &[maxwidth="sm"] {
        max-width: calc(16 * var(--e-space-lg));
    }
    &[maxwidth="none"] {
        max-width: none;
    }
}

@media only screen and (max-width: 600px) {
    e-container {
        padding: var(--e-space-sm);
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

const elementFunctionString = funWrapHTMLElement({ tag: 'e-container', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-container', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
