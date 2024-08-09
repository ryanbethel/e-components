import CustomElement from '@enhance/custom-element'

export default class Avatar extends CustomElement {
    render({ html, state }) {
        return html``
    }
}

if (!customElements.get("e-avatar")) { customElements.define("e-avatar", Avatar) };
