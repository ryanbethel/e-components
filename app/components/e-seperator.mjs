import CustomElement from '@enhance/custom-element'
import SeperatorElement from '../elements/e/seperator.mjs'

  export default class Seperator extends CustomElement {
      render({ html, state }) {
        return SeperatorElement({ html, state })
      }
  }

  customElements.define("e-seperator", Seperator);
