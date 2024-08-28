import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/**********************************/
  hf-button {
    display: inline-block;
    & + & {
      margin-left: var(--hf-space-sm);
      margin-top: var(--hf-space-sm);
    }

    :is(button, a[role="button"]) {
      text-decoration:none;
    }
  }

/**********************************/


@media (max-width: 480px) {
  hf-button[responsive] {
    width: 100%;
    & + & {
     margin-left: unset;
    }
    button {
      width: 100%;
    }
  } 
} 


/**********************************/
  hf-button {
      /*
      Ordinal attribute
      The ord attr is short for "ordinal number word".
      Ordinal number words are the 10+ words used for describing the
      precedence or importance of an item in a group, e.g. Save and Cancel buttons.
    */
      &[ord] :is(button, a[role="button"]) {
        /* display: inline-flex; */
        place-content: center;
        border-radius: var(--hf-border-radius-md);
        cursor: pointer;
        background: none;
        font-size: var(--hf-font-size-md);
        height: var(--hf-input-min-height);
        padding: var(--hf-space-xs) var(--hf-space-md);
        display: flex;
        align-items: center;
        justify-content: center;

        /* Sibling buttons */
        + & {
          margin-left: var(--hf-space-sm);
        }

        /* Disabled */
        &[disabled] {
          cursor: not-allowed;
          border: 2px solid var(--hf-color-disabled-bg);
          color: var(--hf-color-disabled-fg);
          background-color: var(--hf-color-disabled-bg);
        }
      }
  }
/**********************************/

/**********************************/
  hf-button {
      /* Primary ordinal */
      &[ord="primary"] :is(button, a[role="button"]) {
        border: 2px solid var(--hf-color-primary);
        background-color: var(--hf-color-primary);
        color: var(--hf-color-primary-text);
      }

      /* Secondary ordinal */
      &[ord="secondary"] :is(button, a[role="button"]) {
        border: 2px solid var(--hf-color-primary);
        color: var(--hf-color-primary);

        &[aria-pressed="true"],
        &[aria-pressed="mixed"] {
          background-color: var(--hf-color-info);
        }
      }

      /* Tertiary ordinal */
      &[ord="tertiary"] :is(button, a[role="button"]) {
        border: 2px solid var(--hf-color-surface-text);
        color: var(--hf-color-surface-text);
      }
  }
/**********************************/

/**********************************/
  hf-button {
    /* Focus for all buttons */
    &[ord] :is(button, a[role="button"]):focus-visible,
    button[type="remove"]:focus-visible {
      outline: 2px solid var(--hf-color-focus);
      outline-offset: 0;
    }

    /* Link button overrides */
    &[ord] a[role="button"] {
      box-sizing: border-box;

      &:hover {
        text-decoration: none;
      }
    }
  }
/**********************************/

/**********************************/
  hf-button {

    /* Remove button (for close, dismiss, delete use cases) */
    button[type="remove"] {
      all: unset;
      display: inline-flex;
      place-content: center;
      cursor: pointer;
      width: var(--hf-input-min-height);
      font-size: 24px;

      &:active {
        color: initial;
      }
      &::before {
        content: "×";
      }

      /* Disabled */
      &[disabled] {
        color: var(--hf-color-disabled-fg);
        cursor: not-allowed;
      }
    }
  }
/**********************************/


  /* Button Group */
[role="group"]:has(hf-button) {
  display: inline-flex;

  & hf-button:has(:is(button, a[role="button"])) {

    & :is(button, a[role="button"]) {
        border-radius: 0;
        border-right-width: 1px;
        border-left-width: 1px;
    }
      
    &:first-of-type  :is(button, a[role="button"]){
        border-radius: var(--hf-border-radius-md) 0 0
          var(--hf-border-radius-md);
        border-left-width: 2px;
      }

    &:last-of-type  :is(button, a[role="button"]){
        border-radius: 0 var(--hf-border-radius-md)
          var(--hf-border-radius-md) 0;
        border-right-width: 2px;
      }

      & + & {
        margin: 0;
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-button', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-button', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
