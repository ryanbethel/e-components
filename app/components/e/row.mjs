import CustomElement from '@enhance/custom-element'

export default class Row extends CustomElement {
    render({ html, state }) {
        return html`<style scope="global">
    /* Inspired by Flexbox Grid https://github.com/kristoferjoseph/flexboxgrid */
    e-row {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--e-space-md);

        & + & {
            margin-top: var(--e-space-md);
        }

        /* Centers columns inside the row */
        &[center] {
            justify-content: center;

            & e-col:not([span]) {
                flex-grow: inherit;
                flex-basis: inherit;
            }
        }
    }
</style>
<slot></slot>
`
    }
}

if (!customElements.get("e-row")) { customElements.define("e-row", Row) };
