import CustomElement from '@enhance/custom-element'
import Alert from '../../elements/e/alert.mjs'

export default class AlertElement extends CustomElement {
    constructor() {
        super();
        this.dismiss = this.dismiss.bind(this);
    }

    connectedCallback() {
        if (this.getAttribute("dismissible") !== "false") {
            const dismissBtn = this.querySelector("e-button[type=remove]");
            dismissBtn.addEventListener("click", () => this.dismiss());
            this.append(dismissBtn);
        }
    }

    render({ html, state }) {
        return Alert({html, state})
    }

    static get observedAttributes() {
        return ["autodismiss"];
    }

    autodismissChanged(value) {
        console.log('autodismiss', value)
        const seconds = value ? parseInt(value) * 1000 : 4000;
        setTimeout(() => this.dismiss(), seconds);
    }

    dismiss() {
        this.dispatchEvent(new CustomEvent("dismiss"));
        this.remove();
    }
}

customElements.define("e-alert", AlertElement);
