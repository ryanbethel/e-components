import CustomElement from '@enhance/custom-element'
import InputGroup from '../../elements/e/input-group.mjs'

export default class InputGroupElement extends CustomElement {
    render({ html, state }) {
        return InputGroup({html, state})
    }
}

customElements.define("e-input-group", InputGroupElement);
