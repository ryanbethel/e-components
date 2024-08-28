import { funWrapHTMLElement, wrapComponentCE, escString, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
/* Base styles */
hf-alert {
  display: flex;
  align-items: center;
  padding: var(--hf-space-md);
  background-color: var(--hf-color-surface-well);
  color: var(--hf-color-surface-well-text);

  & + & {
    margin-top: var(--hf-space-sm);
  }

  /* Dismiss button */
  & hf-button:last-of-type:has(button[type=remove]){
    margin-left: auto;
  }

  /* Types */
  &[type="info"] {
    background-color: var(--hf-color-info);
    color: var(--hf-color-info-text);
  }

  &[type="success"] {
    background-color: var(--hf-color-success);
    color: var(--hf-color-success-text);
  }

  &[type="warn"] {
    background-color: var(--hf-color-warning);
    color: var(--hf-color-warning-text);
  }

  &[type="error"] {
    background-color: var(--hf-color-error);
    color: var(--hf-color-error-text);
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
    const outerDismissBtn = document.createElement("hf-button");
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
    let dismissBtn = this.querySelector("hf-button > button[type=remove]");
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
  if (!customElements.get('hf-alert')) {customElements.define("hf-alert", EAlert)}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-alert', htmlString: elementHTML })

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
if (!customElements.get('hf-alert')) {customElements.define("hf-alert", EAlert)}
`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
