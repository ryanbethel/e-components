import CustomElement from '@enhance/custom-element'

export default class Details extends CustomElement {
    render({ html, state }) {
        return html`<style scope="global">
    e-details {
        & details {
            > summary {
                cursor: pointer;
                list-style: none; /* Hides caret in Firefox */

                &:focus {
                    outline: none;
                }

                /* Hides caret in Chrome, Safari, etc. */
                &::-webkit-details-marker {
                    display: none;
                }
            }
        }
    }
</style>
<slot></slot>
`
    }
}

if (!customElements.get("e-details")) { customElements.define("e-details", Details) };
