import CustomElement from '@enhance/custom-element'

export default class Loader extends CustomElement {
    render({ html, state }) {
        return html`<style scope="global">
    e-loader {
        display: inline-flex;

        &::before {
          content: '✳';
          -webkit-font-smoothing: antialiased;
        }

        &[loading]:before {
            animation: 1.2s linear infinite e-loader;
        }
    }

    @keyframes e-loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
<slot></slot>

`
    }
}

if (!customElements.get("e-loader")) { customElements.define("e-loader", Loader) };
