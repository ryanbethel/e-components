import CustomElement from '@enhance/custom-element'

export default class ChartContainer extends CustomElement {
    constructor() {
        super()
        this.updateOption = this.updateOption.bind(this)
        this.updateType = this.updateType.bind(this)
        this.chart = document.querySelector('reactive-chart')
    }

    connectedCallback() {
        this.addEventListener('chartoption', this.updateOption)
        this.addEventListener('charttype', this.updateType)
    }

    disconnectedCallback() {
        this.removeEventListener('chartoption', this.updateOption)
        this.removeEventListener('charttype', this.updateType)
    }

    updateOption(evt) {
        const { attribute, value } = evt.detail
        if (value) {
            this.chart.setAttribute(attribute, '')
        } else {
            this.chart.removeAttribute(attribute)
        }
    }

    updateType(evt) {
        const { type } = evt.detail
        this.chart.setAttribute('type', type)
    }

    render({ html }) {
        return html`
    <e-box ord="primary">
        <e-row>
            <e-col span="3">
                <h4 class="mar-t-xs">Chart Options</h4>
                <chart-options>
                    <e-input-group field-class="flex justify-content-between align-items-center" >
                        <fieldset>
                            <label>Multiple</label>
                            <e-switch >
                                <input is="switch" type="checkbox" name="multiple" checked>
                            </e-switch>

                        </fieldset>
                    </e-input-group>
                    <e-input-group field-class="flex justify-content-between align-items-center" >
                        <fieldset>
                            <label>Show Labels</label>
                            <e-switch>
                                <input is="switch" type="checkbox" checked name="show-labels" >
                            </e-switch>
                        </fieldset>
                    </e-input-group>
                </chart-options>
        </e-col>
        <e-col>
            <div>
                <reactive-chart
                    data-key="medals"
                    type="bar"
                    heading="2016 Summer Olympics Medal Table"
                    value-key="Country"
                    value-names="Gold,Silver,Bronze"
                    multiple
                    show-labels>
                </reactive-chart>
                <chart-type>
                    <e-input-group enhanced="✨">
                        <legend>Chart Type</legend>
                        <fieldset>
                            <input id="bar" type="radio" name="type" value="bar" checked>
                            <label for="bar">Bar</label>
                            <input id="column" type="radio" name="type" value="column">
                            <label for="column">Column</label>
                            <input id="area" type="radio" name="type" value="area">
                            <label for="area">Area</label>
                            <input id="line" type="radio" name="type" value="line">
                            <label for="line">Line</label>
                        </fieldset>
                    </e-input-group>
                </chart-type>
            </div>
        </e-col>
    </e-row>
    </e-box>
        `
    }
}

customElements.define("chart-container", ChartContainer);
