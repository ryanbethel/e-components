import CustomElement from '@enhance/custom-element'
import Switch from '../../elements/e/switch.mjs'

export default class SwitchElement extends CustomElement {
    render({ html, state }) {
        return Switch({html, state})
    }
}

customElements.define("e-switch", SwitchElement);
