import CustomElement from '@enhance/custom-element'
import Code from '../../elements/e/code.mjs'

export default class CodeElement extends CustomElement {
    render({ html, state }) {
        return Code({html, state})
    }
}

customElements.define("e-code", CodeElement);
