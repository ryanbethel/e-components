import CustomElement from '@enhance/custom-element'

export default class Dialog extends CustomElement {
    render({ html, state }) {
        return html`<style scope="global">
    e-dialog {
        /* Base dialog styles */
        & dialog {
            border: none;
            padding: var(--e-space-lg);
            background-color: #f5f3f7;
            box-shadow: 0 16px 18px -3px #858585;

            /* Close button */
            & button[slot="close"][type="remove"] {
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }
</style>
<slot></slot>
`
    }
}

if (!customElements.get("e-dialog")) { customElements.define("e-dialog", Dialog) };
