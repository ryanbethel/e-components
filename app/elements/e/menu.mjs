export default function Menu({ html }) {
  return html`
  <style scope="global">
    /* Base menu styles */
    e-menu {
        display: inline-block;
        position: relative;

        /* Menu trigger */
        & > [slot="trigger"] {
            cursor: pointer;
        }

        /* Menu items */
        & > [slot="items"] {
            display: none;
            position: absolute;
            transform: translateY(var(--e-space-xs));
            background-color: white;
            border: 1px solid var(--e-color-gray-4);
            border-radius: var(--e-border-radius-sm);
            width: max-content;
            z-index: 3000;

            /* Link children */
            & > a,
            & > e-link {
                display: block;
                padding: var(--e-space-xs) var(--e-space-sm);
            }
        }

        /* Open state */
        &[open] > [slot="items"] {
            display: block;
        }
    }
</style>
<slot name="trigger"></slot>
<slot name="items"></slot>
<script type="module">
class MenuElement extends HTMLElement {
  #initialized = false;
  #boundClose;

  constructor() {
    super();
    this.#boundClose = this.close.bind(this);
    this.openChanged = this.openChanged.bind(this);
  }

  connectedCallback() {
    if (!this.#initialized) {
      // Bind click to trigger slot
      this.querySelector('[slot="trigger"]')?.addEventListener(
        "click",
        (e) => (this.open = !this.open),
      );
      this.#initialized = true;
    }

    // Close menu if user clicks outside of a menu or navigates away
    document.body.addEventListener("click", this.#boundClose);
    window.addEventListener("popstate", this.#boundClose);
  }

  disconnectedCallback() {
    document.body.removeEventListener("click", this.#boundClose);
    window.removeEventListener("popstate", this.#boundClose);
  }

  close(e) {
    if ((e && e.type === "popstate") || !this.contains(e.target)) {
      this.open = false;
    }
  }

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open") {
      this.openChanged(newValue);
    }
  }

  openChanged(value) {
    this.dispatchEvent(new CustomEvent("toggle"));
  }

  get open() {
    return this.hasAttribute("open");
  }

  set open(isOpen) {
    isOpen
      ? this.setAttribute("open", "")
      : this.removeAttribute("open");
  }

}

if (!customElements.get('e-menu')) { customElements.define("e-menu", MenuElement) };
</script>
`
}
