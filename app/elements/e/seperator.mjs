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

          constructor() {
              super();
              this.verticalChanged = this.verticalChanged.bind(this);
          }

          connectedCallback() {
            this.watch = new MutationObserver(this.wrapBlockquote);
            this.watch.observe(this, { childList: true, subtree: true });
          }

          static get observedAttributes() {
              return ["vertical"];
          }
          
          attributeChangedCallback(name, oldValue, newValue) {
            if (name === "vertical") { this.verticalChanged(newValue) }
          }

          verticalChanged(value) {
          }

      }

      if (!customElements.get('e-seperator')) {customElements.define("e-seperator", Seperator)}
    </script>

  `
}
