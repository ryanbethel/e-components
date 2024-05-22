import CustomElement from '@enhance/custom-element'
import Link from '../../elements/e/link.mjs'

export default class LinkElement extends CustomElement {
    render({ html, state }) {
        return Link({html, state})
    }
}

customElements.define("e-link", LinkElement);
