import { funWrapHTMLElement, wrapComponentCE } from "../wrappers.mjs"

const styleString = /*html*/`
<style scope="global">
    /* Base styles */
    e-badge {
      display: none;
      min-width: 1.25rem;
      height: 1.25rem;
      place-content: center;
      color: var(--e-color-primary-text);
      background-color: var(--e-color-primary);
      border-radius: 0.625rem;
      font-weight: 600;
      line-height: 1.25rem;

      /* Padding for text only */
      &:not([count]) { padding: 0 var(--e-space-xs) }

      /* Count */
      &[count]:before {
        content: attr(count);
        padding: 0 var(--e-space-xs);
      }

      /* Show the badge only when it has a non-zero count or is not empty */
      &:not(:empty),
      &[count]:not([count=""]):not([count="0"]) {
        display: inline-flex;
      }
    }
</style>
`

const markupString = /*html*/`<slot></slot>`

const elementHTML = `
${styleString}
${markupString}
`

const elementFunctionString = funWrapHTMLElement({tag:'e-badge', htmlString:elementHTML})

const componentFunctionString = wrapComponentCE({tag:'e-badge',styleString,markupString})

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
