import CustomElement from '@enhance/custom-element'
import SeperatorElement from '../elements/e/seperator.mjs'

export default class Seperator extends CustomElement {
  render({ html, state }) {
    return SeperatorElement({ html, state })
  }

  static get observedAttributes() {
    return ["vertical"];
  }

  verticalChanged(value) {
    const hr = this.querySelector('hr')
    const isVertical = value === '' || (value && value !== 'false')
    if (isVertical) {
      hr.setAttribute('aria-orientation', "vertical")
    } else {
      hr.removeAttribute('aria-orientation')
    }

  }
}

if (!customElements.get("e-seperator")) { customElements.define("e-seperator", Seperator) };
