import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope="global">
    e-details {
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
</style>
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
${styleString}
${markupString}
`

const elementFunctionString = funWrapHTMLElement({tag:'e-details', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-details',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
