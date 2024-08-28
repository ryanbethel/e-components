import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
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
`

const markupString = /*html*/`<slot></slot>`


const elementHTML = `
<style scope=global>
${indentChunk(cssString)}
</style>
${markupString}
`

const elementFunctionString = funWrapHTMLElement({ tag: 'e-link', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-link', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
