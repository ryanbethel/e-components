import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/* Base styles */
hf-badge {
  display: none;
  min-width: 1.25rem;
  height: 1.25rem;
  place-content: center;
  color: var(--hf-color-primary-text);
  background-color: var(--hf-color-primary);
  border-radius: 0.625rem;
  font-weight: 600;
  line-height: 1.25rem;

  /* Padding for text only */
  &:not([count]) { padding: 0 var(--hf-space-xs) }

  /* Count */
  &[count]:before {
    content: attr(count);
    padding: 0 var(--hf-space-xs);
  }

  /* Show the badge only when it has a non-zero count or is not empty */
  &:not(:empty),
  &[count]:not([count=""]):not([count="0"]) {
    display: inline-flex;
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-badge', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-badge', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
