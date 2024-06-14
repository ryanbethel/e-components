import CustomElement from '@enhance/custom-element'
import API from '../browser/api.mjs'
const api = API()

export default class ChartOptions extends CustomElement {
    constructor() {
        super()
        this.api = api
        this.optionChanged = this.optionChanged.bind(this)
    }

    connectedCallback() {
        this.addEventListener('change', this.optionChanged)
    }

    disconnectedCallback() {
        this.removeEventListener('change', this.optionChanged)
    }

    optionChanged(evt) {
        this.api.store.position = evt.target.value
    }

    render({ html }) {
        return html`
          <slot></slot>
        `
    }
}

customElements.define("chart-options", ChartOptions);
