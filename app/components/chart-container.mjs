import CustomElement from '@enhance/custom-element'

export default class ChartContainer extends CustomElement {
    render({ html }) {
        return html`
        <e-row>
        <e-col colspan="12">
            <e-box ord="primary">
                <e-row>
                <e-col>
                <chart-type>
                    <e-input-group>
                        <legend>Sort By</legend>
                        <fieldset>
                            <input id="goals" type="radio" name="type" value="goals">
                            <label for="goals">Goals</label>
                            <input id="assists" type="radio" name="type" value="assists">
                            <label for="assists">Assists</label>
                            <input id="points" type="radio" name="type" value="points" checked>
                            <label for="points">Points</label>
                        </fieldset>
                    </e-input-group>
                </chart-type>
                </e-col>
                <e-col>
                <chart-options>
                    <e-input-group field-class="flex justify-content-between align-items-center" >
                        <fieldset>
                            <select>
                                <option value="all">Position</option>
                                <option value="C">Centre</option>
                                <option value="L">Left Wing</option>
                                <option value="R">Right Wing</option>
                                <option value="D">Defence</option>
                          </select>
                        </fieldset>
                    </e-input-group>
                </chart-options>
                </e-col>
                </e-row>
                <reactive-chart
                    data-key="scorers"
                    type="points"
                    heading="2023 NHL Scoring Leaders"
                    value-key="Points"
                    value-names="Goals,Assists,Points"
                    position="all"
                    multiple
                    show-labels>
                </reactive-chart>
                </e-box>
            </e-col>
        </e-row>
        `
    }
}

customElements.define("chart-container", ChartContainer);
