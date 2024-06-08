import CustomElement from '@enhance/custom-element'

export default class Blockquote extends CustomElement {
    render({ html, state }) {
        return html`<style scope=global>
e-blockquote {
    blockquote {
        color: var(--e-color-gray-6);
        font-style: italic;
    }
}
</style>

<slot></slot>

`
    }
}

if (!customElements.get("e-blockquote")) { customElements.define("e-blockquote", Blockquote) };
