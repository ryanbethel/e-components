import CustomElement from '@enhance/custom-element'
import Alert from '../elements/e/alert.mjs'

export default class AlertElement extends CustomElement {
  constructor() {
    super();
    this.dismiss = this.dismiss.bind(this);
  }

  connectedCallback() {
    if (this.getAttribute("dismissible") !== "false") {
      let dismissBtn = this.querySelector("e-button > button[type=remove]");
      if (!dismissBtn) {
        dismissBtn = document.createElement("e-button");
        dismissBtn.innerHTML = '<button type=remove aria-label="Dismiss Alert" ></button>'
        this.appendChild(dismissBtn)
      }
      dismissBtn.addEventListener("click", () => this.dismiss());
    }
  }

  render({ html, state }) {
    return Alert({ html, state })
  }

  static get observedAttributes() {
    return ["autodismiss"];
  }

  autodismissChanged(value) {
    const seconds = value ? parseInt(value) * 1000 : 4000;
    setTimeout(() => this.dismiss(), seconds);
  }

  dismiss() {
    this.dispatchEvent(new CustomEvent("dismiss"));
    this.remove();
  }
}

if (!customElements.get('e-alert')) { customElements.define("e-alert", AlertElement) }
