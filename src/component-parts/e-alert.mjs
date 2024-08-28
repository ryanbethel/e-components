import { funWrapHTMLElement, wrapComponentCE, escString, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/* Base styles */
e-alert {
  display: flex;
  align-items: center;
  padding: var(--e-space-md);
  background-color: var(--e-color-surface-well);
  color: var(--e-color-surface-well-text);

  & + & {
    margin-top: var(--e-space-sm);
  }

  /* Dismiss button */
  & e-button:last-of-type:has(button[type=remove]){
    margin-left: auto;
  }

  /* Types */
  &[type="info"] {
    background-color: var(--e-color-info);
    color: var(--e-color-info-text);
  }

  &[type="success"] {
    background-color: var(--e-color-success);
    color: var(--e-color-success-text);
  }

  &[type="warn"] {
    background-color: var(--e-color-warning);
    color: var(--e-color-warning-text);
  }

  &[type="error"] {
    background-color: var(--e-color-error);
    color: var(--e-color-error-text);
  }
}
`

const markupString = /*html*/`<slot></slot>`


const scriptString = /*javascript*/`

  static get observedAttributes() {
      return ["autodismiss", "dismissible"];
  }

  constructor() {
      super();
      this.dismiss = this.dismiss.bind(this);
      this.autodismissChanged = this.autodismissChanged.bind(this);
      this.setupDismissButton = this.setupDismissButton.bind(this);
      this.cleanDismissButton = this.cleanDismissButton.bind(this);
  }

  connectedCallback() {
      if (this.getAttribute("dismissible") !== "false") {
        this.setupDismissButton()
      }
  }

setupDismissButton(){
  let dismissBtn = this.querySelector("button[type=remove]");
  if (!dismissBtn) { 
    const outerDismissBtn = document.createElement("e-button");
    outerDismissBtn.innerHTML = '<button type=remove aria-label="Dismiss Alert" ></button>'
    this.appendChild(outerDismissBtn)
    dismissBtn = this.querySelector("button[type=remove]");
  }
  dismissBtn?.addEventListener("click", this.dismiss);
  dismissBtn?.addEventListener("keydown", (e) => {
   if (e.key === 'Enter' || e.key === ' ') { this.dismiss }
  });

  }
  cleanDismissButton(){
    let dismissBtn = this.querySelector("e-button > button[type=remove]");
    dismissBtn?.remove()
  }

  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "autodismiss") { this.autodismissChanged(newValue) }
    if (name === "dismissible") {
      if (newValue === "false") {
        this.cleanDismissButton()
      } else {
        this.setupDismissButton()
      }
    }
  }

  autodismissChanged(value) {
      const seconds = value ? parseInt(value) * 1000 : 4000;
      setTimeout(() => this.dismiss(), seconds);
  }

  dismiss() {
      this.dispatchEvent(new CustomEvent("dismiss"));
      this.remove();
  }
`



const elementHTML = `
<style scope="global">
${indentChunk(cssString)}
</style>
${markupString}
<script type="module">
  class EAlert extends HTMLElement {
${indentChunk(scriptString)}
  }
  if (!customElements.get('e-alert')) {customElements.define("e-alert", EAlert)}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'e-alert', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
import CustomElement from '/_public/browser/custom-element.mjs'
export default class EAlert extends CustomElement {
${indentChunk(scriptString, '    ')}
    render({ html, state }) {
      return html\`
        <style scope="global">
        ${indentChunk(cssString)}
        </style>
        ${markupString}
      \`}
}
if (!customElements.get('e-alert')) {customElements.define("e-alert", EAlert)}
`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
