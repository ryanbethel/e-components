import CustomElement from '@enhance/custom-element'
import Menu from '../elements/e/menu.mjs'

export default class MenuElement extends CustomElement {
  #initialized = false;
  #boundClose;

  constructor() {
    super();
    this.#boundClose = this.close.bind(this);
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

  render({ html, state }) {
    return Menu({ html, state })
  }
}

if (!customElements.get('e-menu')) { customElements.define("e-menu", MenuElement) };
