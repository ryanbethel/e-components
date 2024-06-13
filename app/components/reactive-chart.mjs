import CustomElement from '@enhance/custom-element'
import API from '../browser/api.mjs'
const api = API()

export default class ReactiveChart extends CustomElement {
  constructor() {
    super()
    this.table = this.querySelector('table')
    this.api = api
    this.update = this.update.bind(this)
  }

  connectedCallback() {
    this.api.subscribe(this.update,['chartData'])
  }

  disconnectedCallback() {
    this.api.unsubscribe(this.update)
  }

  render({ html, state }) {
        const { attrs = {}, store = {} } = state
        const { chartData = {} } = store

        const config = {
          dataKey: attrs['data-key'],
          type: 'bar',
          heading: attrs.heading || null,
          valueKey: attrs['value-key'],
          valueNames: attrs['value-names']?.split(',') || [],
          multiple: typeof attrs.multiple === 'string',
          showLabels: typeof attrs['show-labels'] === 'string',
        }

        const data = chartData[config?.dataKey] || []
        const maxValue = chartData.maxValue || 100
        const allClasses = [
          'charts-css',
          config.type,
          config.multiple ? 'multiple' : null,
          config.showLabels ? 'show-labels' : null,
        ]

        return html`
        <style>
          caption {
            font-size: 1rem;
            font-weight: bold;
            line-height: 1.25rem;
          }
          #my-chart {
            display: flex;
            flex-direction: row;
            gap: 40px;
            width: 100%;
            margin: 0 auto;
          }
          #my-chart .bar, #my-chart .legend {
            --color-1: #B9975B;
            --color-2: lightgrey;
            --color-3: #C1C6C8;
          }
          .legend {
            max-width: 150px;
          }
        </style>
        <div id="my-chart">
          <table class="${allClasses.join(' ')}">
            <caption>${config.heading}</caption>
            <thead>
              <tr>
                <th scope="col">${config.valueKey}</th>
                ${config.valueNames.map(v =>
                  `<th scope="col">${v}</th>`
                ).join('\n')}
              </tr>
            </thead>
            <tbody>
              ${data.map(d => `
                <tr>
                  <th scope="row"> ${d.label} </th>
                  ${d.values.map((v, i) => {
                    const style = [
                      `--start: calc(${v}/${maxValue});`,
                      `--size: calc(${v}/${maxValue});`,
                      d.colors?.at(i) ? `--color: ${d.colors.at(i)}` : null,
                    ]
                    return `<td style="${style.join(' ')}">${v}</td>`
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
          <ul class="charts-css legend legend-square">
            <li>Goals</li>
            <li>Assists</li>
            <li>Points</li>
          </ul>
        </div>
        `
      }

    static get observedAttributes() {
        return ["position", "type"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
          this.api.list(this.getAttribute('type'), this.getAttribute('position'))
        }
    }

    update() {
      const data = this?.api?.store?.chartData?.scorers || []
      const maxValue = this?.api?.store?.chartData?.maxValue || 100
      const rows = data.map(d => `
        <tr>
          <th scope="row"> ${d.label} </th>
          ${d.values.map((v, i) => {
            const style = [
              `--start: calc(${v}/${maxValue});`,
              `--size: calc(${v}/${maxValue});`,
              d.colors?.at(i) ? `--color: ${d.colors.at(i)}` : null,
            ]
            return `<td style="${style.join(' ')}">${v}</td>`
          }).join('')}
        </tr>
      `).join('')

      if (!document.startViewTransition) {
        this.table.querySelector('tbody').innerHTML = rows
      } else {
        document.startViewTransition(() => this.table.querySelector('tbody').innerHTML = rows)
      }
    }
}

customElements.define("reactive-chart", ReactiveChart);
