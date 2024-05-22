import CustomElement from '@enhance/custom-element'
import Button from '../../elements/e/button.mjs'

export default class ButtonElement extends CustomElement {
    render({ html, state }) {
        return Button({html, state})
    }
}

customElements.define("e-button", ButtonElement);
