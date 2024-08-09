import CustomElement from '@enhance/custom-element'

export default class Loader extends CustomElement {
    render({ html, state }) {
        return html`<style scope="global">
    e-loader {
        display: inline-flex;
        vertical-align: middle;

        &::before {
            margin-inline-end: var(--e-space-xs);
            text-align: center;
                    width: 1.25em;
                    height: 1.25em;
                    /* position: absolute; */
                    /* top: var(--e-space-sm);
                    right: var(--e-space-sm);
                    transform: rotate(0deg);
                    transition: transform 250ms; */
          /* content: '✳'; */
            mask-size: contain;
            mask-repeat: no-repeat;
            mask-position: center;
            mask-type:alpha;
            background-color: currentColor;
            content: '';
            mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221em%22%20height%3D%221em%22%20fill%3D%22currentColor%22%20stroke%3D%22currentColor%22%20viewBox%3D%220%200%20256%20256%22%3E%3Cpath%20d%3D%22M136%2C32V64a8%2C8%2C0%2C0%2C1-16%2C0V32a8%2C8%2C0%2C0%2C1%2C16%2C0Zm88%2C88H192a8%2C8%2C0%2C0%2C0%2C0%2C16h32a8%2C8%2C0%2C0%2C0%2C0-16Zm-45.09%2C47.6a8%2C8%2C0%2C0%2C0-11.31%2C11.31l22.62%2C22.63a8%2C8%2C0%2C0%2C0%2C11.32-11.32ZM128%2C184a8%2C8%2C0%2C0%2C0-8%2C8v32a8%2C8%2C0%2C0%2C0%2C16%2C0V192A8%2C8%2C0%2C0%2C0%2C128%2C184ZM77.09%2C167.6%2C54.46%2C190.22a8%2C8%2C0%2C0%2C0%2C11.32%2C11.32L88.4%2C178.91A8%2C8%2C0%2C0%2C0%2C77.09%2C167.6ZM72%2C128a8%2C8%2C0%2C0%2C0-8-8H32a8%2C8%2C0%2C0%2C0%2C0%2C16H64A8%2C8%2C0%2C0%2C0%2C72%2C128ZM65.78%2C54.46A8%2C8%2C0%2C0%2C0%2C54.46%2C65.78L77.09%2C88.4A8%2C8%2C0%2C0%2C0%2C88.4%2C77.09Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');

          -webkit-font-smoothing: antialiased;
        }

        &[loading]::before {
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
