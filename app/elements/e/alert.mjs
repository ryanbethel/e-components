export default function Alert({ html, state }) {
  const { attrs } = state;
  const isDismissible = attrs.dismissible !== "false"; // string "false"
  return html`
    <style scope="global">
      /* Base styles */
      e-alert {
        display: flex;
        align-items: center;
        padding: var(--e-space-md);
        background-color: var(--e-color-gray-2);

        & + & {
          margin-top: var(--e-space-sm);
        }

        /* Dismiss button */
        & e-button:last-of-type:has(button[type=remove]){
          margin-left: auto;
        }

        /* Types */
        &[type="info"] {
          background-color: var(--e-color-info-1);

          &::before {
            color: var(--e-color-info-3);
          }
        }

        &[type="success"] {
          background-color: var(--e-color-success-1);

          &::before {
            color: var(--e-color-success-3);
          }
        }

        &[type="warn"] {
          background-color: var(--e-color-warning-1);

          &::before {
            color: var(--e-color-warning-3);
          }
        }

        &[type="error"] {
          background-color: var(--e-color-error-1);

          &::before {
            color: var(--e-color-error-3);
          }
        }
      }
    </style>

    <slot></slot>

    ${isDismissible && '<e-button><button type=remove aria-label="Dismiss Alert" ></button></e-button>'}

    <script type="module">
      class AlertElement extends HTMLElement {

          constructor() {
              super();
              this.dismiss = this.dismiss.bind(this);
              this.autodismissChanged = this.autodismissChanged.bind(this);
          }

          connectedCallback() {
              if (this.getAttribute("dismissible") !== "false") {
                  let dismissBtn = this.querySelector("e-button > button[type=remove]");
                  if (!dismissBtn) { 
                    dismissBtn = document.createElement("e-button");
                    dismissBtn.innerHTML = '<button type=remove aria-label="Dismiss Alert" ></button>'
                    this.appendChild(dismissBtn)
                  }
                  dismissBtn.addEventListener("click", () => this.dismiss());
              }
          }

          static get observedAttributes() {
              return ["autodismiss"];
          }
          
          attributeChangedCallback(name, oldValue, newValue) {
            if (name === "autodismiss") { this.autodismissChanged(newValue) }
          }

          autodismissChanged(value) {
              const seconds = value ? parseInt(value) * 1000 : 4000;
              setTimeout(() => this.dismiss(), seconds);
          }

          dismiss() {
              this.dispatchEvent(new CustomEvent("dismiss"));
              this.remove();
          }
      }

      if (!customElements.get('e-alert')) {customElements.define("e-alert", AlertElement)}
    </script>

  `;
}
