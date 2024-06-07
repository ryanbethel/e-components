import CustomElement from '@enhance/custom-element'

export default class ChartType extends CustomElement {
    constructor() {
        super()
        this.typeChanged = this.typeChanged.bind(this)
    }

    connectedCallback() {
        this.addEventListener('change', this.typeChanged)
    }

    disconnectedCallback() {
        this.removeEventListener('change', this.typeChanged)
    }

    typeChanged(evt) {
        this.dispatchEvent(
            new CustomEvent("charttype", {
              bubbles: true,
              detail: {
                type: evt.target.value,
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

customElements.define("chart-type", ChartType);
