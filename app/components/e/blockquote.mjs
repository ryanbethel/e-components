import CustomElement from '@enhance/custom-element'

export default class Blockquote extends CustomElement {
    render({ html, state }) {
        return html`<style scope=global>
e-blockquote {
    blockquote {
        color: var(--e-color-surface-subtext);
        font-style: italic;
    }
}
</style>

<blockquote><slot></slot></blockquote>

`
    }
}

if (!customElements.get("e-blockquote")) { customElements.define("e-blockquote", Blockquote) };
