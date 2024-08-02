import CustomElement from '@enhance/custom-element'

export default class Button extends CustomElement {
    render({ html, state }) {
        return html`    <style scope="global">
    /**********************************/
      e-button {
        display: inline-block;
        & + & {
          margin-left: var(--e-space-sm);
          margin-top: var(--e-space-sm);
        }

        :is(button, a[role="button"]) {
          text-decoration:none;
        }
      }
    /**********************************/

    /**********************************/
      e-button {
          /*
          Ordinal attribute
          The ord attr is short for "ordinal number word".
          Ordinal number words are the 10+ words used for describing the
          precedence or importance of an item in a group, e.g. Save and Cancel buttons.
        */
          &[ord] :is(button, a[role="button"]) {
            display: inline-flex;
            place-content: center;
            border-radius: var(--e-border-radius-md);
            cursor: pointer;
            background: none;
            font-size: var(--e-font-size-default);
            height: var(--e-input-min-height);
            padding: var(--e-space-xs) var(--e-space-md);

            /* Sibling buttons */
            + & {
              margin-left: var(--e-space-sm);
            }

            /* Disabled */
            &[disabled] {
              cursor: not-allowed;
              border: 2px solid var(--e-color-disabled-bg);
              color: var(--e-color-disabled-fg);
              background-color: var(--e-color-disabled-bg);
            }
          }
      }
    /**********************************/

    /**********************************/
      e-button {
          /* Primary ordinal */
          &[ord="primary"] :is(button, a[role="button"]) {
            border: 2px solid var(--e-color-primary-action);
            background-color: var(--e-color-primary-action);
            color: white;
          }

          /* Secondary ordinal */
          &[ord="secondary"] :is(button, a[role="button"]) {
            border: 2px solid var(--e-color-primary-action);
            color: var(--e-color-primary-action);

            &[aria-pressed="true"],
            &[aria-pressed="mixed"] {
              background-color: var(--e-color-info-1);
            }
          }

          /* Tertiary ordinal */
          &[ord="tertiary"] :is(button, a[role="button"]) {
            border: 2px solid var(--e-color-gray-7);
            color: var(--e-color-gray-7);
          }
      }
    /**********************************/

    /**********************************/
      e-button {
        /* Focus for all buttons */
        &[ord] :is(button, a[role="button"]):focus-visible,
        button[type="remove"]:focus-visible {
          outline: 2px solid var(--e-color-focus);
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
      e-button {

        /* Remove button (for close, dismiss, delete use cases) */
        button[type="remove"] {
          all: unset;
          display: inline-flex;
          place-content: center;
          cursor: pointer;
          width: var(--e-input-min-height);
          font-size: 24px;

          &:active {
            color: initial;
          }
          &::before {
            content: "×";
          }

          /* Disabled */
          &[disabled] {
            color: var(--e-color-disabled-fg);
            cursor: not-allowed;
          }
        }
      }
    /**********************************/


      /* Button Group */
    [role="group"]:has(e-button) {
      display: inline-flex;

      & e-button:has(:is(button, a[role="button"])) {

        & :is(button, a[role="button"]) {
            border-radius: 0;
            border-right-width: 1px;
            border-left-width: 1px;
        }
          
        &:first-of-type  :is(button, a[role="button"]){
            border-radius: var(--e-border-radius-md) 0 0
              var(--e-border-radius-md);
            border-left-width: 2px;
          }

        &:last-of-type  :is(button, a[role="button"]){
            border-radius: 0 var(--e-border-radius-md)
              var(--e-border-radius-md) 0;
            border-right-width: 2px;
          }

          & + & {
            margin: 0;
          }
        }
      }
    </style>
    <slot></slot>
`
    }
}

if (!customElements.get("e-button")) { customElements.define("e-button", Button) };
