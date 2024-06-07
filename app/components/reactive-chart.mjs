import CustomElement from '@enhance/custom-element'

export default class ReactiveChart extends CustomElement {
  constructor() {
    super()
    this.table = this.querySelector('table')
    this.updateOption = this.updateOption.bind(this)
    this.updateType = this.updateType.bind(this)
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
        this.setAttribute(attribute, '')
    } else {
        this.removeAttribute(attribute)
    }
  }

  updateType(evt) {
    const { type } = evt.detail
    this.setAttribute('type', type)
  }

  render({ html, state }) {
        const { attrs = {}, store = {} } = state
        const { chartData = {} } = store

        const config = {
          dataKey: attrs['data-key'],
          type: attrs.type || 'bar',
          heading: attrs.heading || null,
          valueKey: attrs['value-key'],
          valueNames: attrs['value-names']?.split(',') || [],
          multiple: typeof attrs.multiple === 'string',
          showLabels: typeof attrs['show-labels'] === 'string',
        }

        const data = chartData[config?.dataKey] || []
        const allClasses = [
          'charts-css',
          config.type,
          config.multiple ? 'multiple' : null,
          config.showLabels ? 'show-labels' : null,
        ]

        return html`
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
                      `--start: calc(${v}/100);`,
                      `--size: calc(${v}/100);`,
                      d.colors?.at(i) ? `--color: ${d.colors.at(i)}` : null,
                    ]
                    return `<td style="${style.join(' ')}">${v}</td>`
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        `
      }

    static get observedAttributes() {
        return ["multiple", "show-labels", "type"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'type') {
                this.table.classList.replace(oldValue, newValue);
            } else {
                this.hasAttribute(name) ?
                    this.table.classList.add(name) :
                    this.table.classList.remove(name)
            }
        }
    }
}

customElements.define("reactive-chart", ReactiveChart);
