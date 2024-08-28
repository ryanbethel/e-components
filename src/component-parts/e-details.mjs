import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-details {
    & details {
        > summary {
            cursor: pointer;
            list-style: none; /* Hides caret in Firefox */

            &:focus {
                outline: none;
            }

            /* Hides caret in Chrome, Safari, etc. */
            &::-webkit-details-marker {
                display: none;
            }
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-details', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-details', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
