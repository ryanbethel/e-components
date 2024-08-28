import { funWrapHTMLElement, wrapComponentCE, escString, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-accordion {
    display: block;

    & > details {
        border-top: 3px solid var(--hf-color-gray-2);

        &[open] > summary:after {
            transform: rotate(180deg);
            transition: transform 250ms;
        }

        > summary {
            cursor: pointer;
            list-style: none; /* Hides caret in Firefox */

            &:focus {
                outline: none;
            }
            padding: var(--hf-space-sm) var(--hf-space-xl) var(--hf-space-sm) 0;
            position: relative;

            &:focus-visible {
                outline: 2px solid var(--hf-color-focus);
            }

            &::after {
                width: 24px;
                height: 24px;
                position: absolute;
                top: var(--hf-space-sm);
                right: var(--hf-space-sm);
                transform: rotate(0deg);
                transition: transform 250ms;
                mask-size: contain;
                mask-repeat: no-repeat;
                mask-position: center;
                mask-type: alpha;
                background-color: currentColor;
                content: '';
                mask-image: url('data:image/svg+xml, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22currentColor%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20d%3D%22M216.49%2C104.49l-80%2C80a12%2C12%2C0%2C0%2C1-17%2C0l-80-80a12%2C12%2C0%2C0%2C1%2C17-17L128%2C159l71.51-71.52a12%2C12%2C0%2C0%2C1%2C17%2C17Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
            }
            /* Hides caret in Chrome, Safari, etc. */
            &::-webkit-details-marker {
                display: none;
            }
        }

        &:last-child {
            border-bottom: 3px solid var(--hf-color-gray-2);
        }
    }

}
`
const markupString = /*html*/`<slot></slot>`


const scriptString = /*javascript*/`
constructor() {
    super();
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.connectToggleListeners = this.connectToggleListeners.bind(this);
    this.removeToggleListeners = this.removeToggleListeners.bind(this);
}
connectedCallback() {
    this.autoClose = this.hasAttribute('auto-close');
    if (this.autoClose) { this.connectToggleListeners(); }
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeName === 'DETAILS') {
                    node.addEventListener('toggle', this.toggleAccordion);
                }
            });
        });
    });
    observer.observe(this, { childList: true });
}

attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'auto-close') {
        if (newValue === null || newValue === 'false') {
            this.removeToggleListeners();
        } else {
            this.connectToggleListeners();
        }
    }
}

connectToggleListeners() {
    const allDetails = this.querySelectorAll('details');
    allDetails.forEach(detail => {
        detail.addEventListener('toggle', this.toggleAccordion);
    });
}
removeToggleListeners() {
    const allDetails = this.querySelectorAll('details');
    allDetails.forEach(detail => {
        detail.removeEventListener('toggle', this.toggleAccordion);
    });
}
toggleAccordion(e) {
    if (e.currentTarget.open) {
        const openSiblings = e.currentTarget.parentElement.querySelectorAll('details[open]')
        openSiblings.forEach(detail => {
            if (detail !== e.currentTarget) {
                detail.open = false
            }
        });
    }
}

`
const elementHTML = `
<style scope="global">
${indentChunk(cssString)}
</style>
${markupString}
<script type=module>
  class EAccordion extends HTMLElement {
${indentChunk(scriptString)}
  }
  if(!customElements.get('hf-accordion')) { customElements.define('hf-accordion', EAccordion) }
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-accordion', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
import CustomElement from '/_public/browser/custom-element.mjs'
export default class EAccordion extends CustomElement {
${indentChunk(scriptString, '    ')}
    render({ html, state }) {
      return html\`
        <style scope="global">
        ${indentChunk(cssString)}
        </style>
        ${markupString}
      \`}
}
if (!customElements.get('hf-accordion')) {customElements.define("hf-accordion", EAccordion)}
`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
