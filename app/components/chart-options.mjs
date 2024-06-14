import CustomElement from '@enhance/custom-element'

export default class ChartOptions extends CustomElement {
    constructor() {
        super()
        this.optionChanged = this.optionChanged.bind(this)
    }

    connectedCallback() {
        this.addEventListener('change', this.optionChanged)
    }

    disconnectedCallback() {
        this.removeEventListener('change', this.optionChanged)
    }

    optionChanged(evt) {
        this.dispatchEvent(
            new CustomEvent("chartoption", {
              bubbles: true,
              detail: {
                attribute: evt.target.name,
                value: evt.target.checked
               },
            }),
        )
    }

    render({ html }) {
        return html`
          <slot></slot>
        `
    }
}

customElements.define("chart-options", ChartOptions);
