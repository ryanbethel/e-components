import CustomElement from '@enhance/custom-element'

export default class Keyboard extends CustomElement {
    render({ html, state }) {
        return html`<style scope="global">
    e-keyboard {
        kbd {
            font-family: system-ui;

            &:not(:has(kbd)),
            & kbd {
                border-radius: 3px;
                box-shadow: 0 1px 2px 0 var(--e-color-gray-5);
                padding: 0 4px;
                background: white;
            }
        }
    }
</style>
<kbd><slot></slot></kbd>
`
    }
}

if (!customElements.get("e-keyboard")) { customElements.define("e-keyboard", Keyboard) };
