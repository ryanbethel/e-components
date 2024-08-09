import CustomElement from '@enhance/custom-element'

export default class Accordion extends CustomElement {
    render({ html, state }) {
        return html`<style scope="global">
    e-accordion {
        display: block;

        & e-details:last-child > details {
                border-bottom: 3px solid var(--e-color-gray-2);
            }
        & e-details > details {
            border-top: 3px solid var(--e-color-gray-2);


            &[open] > summary:after {
                transform: rotate(180deg);
                transition: transform 250ms;
            }

            & > summary {
                padding: var(--e-space-sm) var(--e-space-xl) var(--e-space-sm) 0;
                position: relative;

                &:focus-visible {
                    outline: 2px solid var(--e-color-focus);
                }

                &::after {
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    top: var(--e-space-sm);
                    right: var(--e-space-sm);
                    transform: rotate(0deg);
                    transition: transform 250ms;
                    mask-size: contain;
                    mask-repeat: no-repeat;
                    mask-position: center;
                    mask-type: alpha;
                    background-color: currentColor;
                    content: '';
                    mask-image: url('data:image/svg+xml, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22currentColor%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20d%3D%22M216.49%2C104.49l-80%2C80a12%2C12%2C0%2C0%2C1-17%2C0l-80-80a12%2C12%2C0%2C0%2C1%2C17-17L128%2C159l71.51-71.52a12%2C12%2C0%2C0%2C1%2C17%2C17Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
                }
            }
        }
    }
</style>
<slot></slot>
`
    }
}

if (!customElements.get("e-accordion")) { customElements.define("e-accordion", Accordion) };
