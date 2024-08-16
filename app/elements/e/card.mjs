export default function Card({ html, state }) {
  const { attrs } = state
  const { title = '', href = '' } = attrs
  return html`
    <style scope="global">
    e-card {
        display: flex;
        flex-direction: column;
        position: relative;
        border-radius: var(--e-border-radius-md);
        border: 1px solid var(--e-color-gray-2);
        cursor: pointer;

        & .img:has(img) {
            height: var(--e-card-image-height, 6.5rem);
        }
        & .img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        & a {
            text-decoration: none;
            color: var(--e-color-primary);
        }
        & a:focus {
            outline: none;
            text-decoration: underline;
        }
        &:focus-within, &:hover {
            border: 2px solid var(--e-color-gray-3);
        }
        &:focus-within a:focus {
            text-decoration: none;
        }
        & .text {
            padding: 1rem;
            flex: 1 0 auto;
            display: flex;
            flex-direction: column;
        }
        &, & .text {
            display: flex;
            flex-direction: column;
        }

        & .text {
            flex-grow: 1;
        }

        & .text > * + * {
            margin-top: 0.75rem;
        }

        & .text :last-child {
            margin-top: auto;
        }

        & .text :nth-last-child(2) {
            margin-bottom: 0.75rem;
        }
    }
    </style>
    <div class="img">
        <slot name="image"></slot>
    </div>
    <div class="text">
        <h2>
            ${href ? `<a href="${href}">${title}</a>` : `${title}`}
        </h2>
        <slot></slot>
    </div>

    <script type=module>
        import CustomElement from '/_public/browser/custom-element.mjs'
        class ECard extends CustomElement {
            constructor(){
                super()
            }
            render({html,state}){
                return html\`
                    <div class="img">
                        <slot name="image"></slot>
                    </div>
                    <div class="text">
                        <h2>
                            \${href ? '<a href="' + href +'">' + title +'</a>' : title }
                        </h2>
                        <slot></slot>
                    </div>
                \`
            }

        }
        if (!customElements.get('e-card')) { customElements.define('e-card', ECard)}
    </script>
    `
}
