import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
    <style scope=global>
      e-link {
        /* Base link styles */
        a, *[role=link] {
          text-decoration: none;
          color: var(--e-color-primary);
          cursor: pointer;

          /*:is(a, span[role=link]):visited { color: var(--e-color-primary-action) }*/
          &:hover,
          &:focus-visible {
            text-decoration: underline;
            outline: 0;
          }

          /* Disabled state */
          &[disabled] {
            color: var(--e-color-disabled-fg);
            pointer-events: none;
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

const elementFunctionString = funWrapHTMLElement({tag:'e-link', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-link',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 