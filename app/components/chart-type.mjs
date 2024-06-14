import CustomElement from '@enhance/custom-element'
import API from '../browser/api.mjs'
const api = API()

export default class ChartType extends CustomElement {
    constructor() {
        super()
        this.api = api
        this.typeChanged = this.typeChanged.bind(this)
    }

    connectedCallback() {
        this.addEventListener('change', this.typeChanged)
    }

    disconnectedCallback() {
        this.removeEventListener('change', this.typeChanged)
    }

    typeChanged(evt) {
        this.api.store.type = evt.target.value
    }

    render({ html }) {
        return html`
          <slot></slot>
        `
    }
}

customElements.define("chart-type", ChartType);
