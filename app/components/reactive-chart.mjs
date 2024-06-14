import CustomElement from '@enhance/custom-element'

export default class ReactiveChart extends CustomElement {
  constructor() {
    super()
    this.table = this.querySelector('table')
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
                this.updateType(oldValue, newValue)
            } else {
                this.updateOption(name)
            }
        }
    }

    updateOption(name) {
        const toggleAttribute = (name) => this.hasAttribute(name) ?
            this.table.classList.add(name) :
            this.table.classList.remove(name)
        if (!document.startViewTransition) {
            toggleAttribute(name)
        } else {
            document.startViewTransition(() => toggleAttribute(name))
        }
    }

    updateType(oldValue, newValue) {
        if (!document.startViewTransition) {
            this.table.classList.replace(oldValue, newValue)
        } else {
            document.startViewTransition(() => this.table.classList.replace(oldValue, newValue))
        }
    }
}

customElements.define("reactive-chart", ReactiveChart);
