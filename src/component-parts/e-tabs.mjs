import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/* Base tabs styles */
hf-tabs {
    display: flex;
    align-items: flex-start;

    /* Scrolling tabs */
    &[scrollable] {
        overflow-x: scroll;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    /* Base tab styles */
    & :is(hf-link, hf-button, button, a) {
        all: unset;
        display: inline-flex;


    & + & {
      margin-top: 0;
      margin-left: 0;
    }

      &:has([aria-selected="true"]), &:is([aria-selected="true"]) {
          border-bottom: 2px solid var(--hf-color-primary);
      }
      /* & :not([disabled]):not([aria-selected="true"]):hover { */
      /*     border-bottom: 2px solid var(--hf-color-gray-3); */
      /*     text-decoration: none; */
      /* } */

      &:is(a, button) {
          all: unset;
          display: inline-flex;
          color: var(--hf-color-surface-text);
          font-weight: bold;
          text-align: center;
          white-space: nowrap;
          padding: var(--hf-space-xs) var(--hf-space-lg);
          cursor: pointer;

          &:focus-visible {
              outline: 2px solid var(--hf-color-focus);
          }

          /* Hover state */
          &:not([disabled]):not([aria-selected="true"]):hover {
              border-bottom: 2px solid var(--hf-color-gray-3);
              text-decoration: none;
          }

          /* Selected state */
          /* &[aria-selected="true"] { */
          /*     border-bottom: 2px solid var(--hf-color-primary-action); */
          /* } */

          /* Disabled state */
          &[disabled] {
              color: var(--hf-color-disabled-fg);
              cursor: default;
          }
      }

      & :is(a, button) {
          all: unset;
          display: inline-flex;
          color: var(--hf-color-gray-7);
          font-weight: bold;
          text-align: center;
          white-space: nowrap;
          padding: var(--hf-space-xs) var(--hf-space-lg);
          cursor: pointer;

          &:focus-visible {
              outline: 2px solid var(--hf-color-focus);
          }

          /* Hover state */
          &:not([disabled]):not([aria-selected="true"]):hover {
              border-bottom: 2px solid var(--hf-color-gray-3);
              text-decoration: none;
          }

          /* Selected state */
          /* &[aria-selected="true"] { */
          /*     border-bottom: 2px solid var(--hf-color-primary-action); */
          /* } */

          /* Disabled state */
          &[disabled] {
              color: var(--hf-color-disabled-fg);
              cursor: default;
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-tags', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-tags', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
