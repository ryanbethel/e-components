export default function Seperator({ html, state }) {
  const verticalAttr = state.attrs.vertical;
  const isVertical = verticalAttr === '' || (verticalAttr && verticalAttr !== 'false')
  return html`
    <style scope=global>

      e-seperator { 
        display: block; 

        &[vertical] {
          display:flex;
          height:  auto;
        }

        hr {
          background-color: var(--e-color-gray-3);
          border: none;
          margin: 0;
          height: 1px;
        }

        hr[aria-orientation=vertical] {
            width: 1px;
            height: auto;
        }
      }
    </style>
    <hr ${isVertical ? 'aria-orientation="vertical"' : ''} />
    <script type="module">
      class Seperator extends HTMLElement {
        #contentInitialized = false;

        constructor() {
            super();
            this.verticalChanged = this.verticalChanged.bind(this);
        }

        connectedCallback() {
          const enhancedAttribute = this.getAttribute('enhanced')
          if (enhancedAttribute==='✨') =  { this.#contentInitialized = true }
          const verticalAttr = this.getAttribute('vertical')
          const isVertical = verticalAttr === '' || (verticalAttr && verticalAttr !== 'false')

          if (!this.#contentInitialized) {
            if (isVertical) {
              this.innerHTML = '<hr aria-orientation="vertical" />'
            } else {
              this.innerHTML = '<hr/>'
            }
            this.#contentInitialized = true 
          }
        }

        static get observedAttributes() {
            return ["vertical"];
        }
        
        attributeChangedCallback(name, oldValue, newValue) {
          if (name === "vertical") { this.verticalChanged(newValue) }
        }

        verticalChanged(value) {
          const hr = this.querySelector('hr')
          const isVertical = value === '' || (value && value !== 'false')
          if (isVertical) {
            hr.setAttribute('aria-orientation',"vertical")
          } else {
            hr.removeAttribute('aria-orientation')
          }
          
        }

      }

      if (!customElements.get('e-seperator')) {customElements.define("e-seperator", Seperator)}
    </script>

  `
}
