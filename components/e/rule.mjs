import CustomElement from '@enhance/custom-element'
import Rule from '../../elements/e/rule.mjs'

export default class RuleElement extends CustomElement {
    render({ html, state }) {
        return Rule({html, state})
    }
}

customElements.define("e-rule", RuleElement);
