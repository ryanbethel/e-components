import CustomElement from '/_public/browser/custom-element.mjs'
class ECard extends CustomElement {
    constructor(){
        super()
    }
    render({html,state}){
      const { attrs } = state
      const { title = '', href = '' } = attrs
        return html`

  const { attrs } = state
  const { title = '', href = '' } = attrs
      <style scope="global">
        e-card {
            display: flex;
            flex-direction: column;
            position: relative;
            border-radius: var(--e-border-radius-md);
            border: 1px solid var(--e-color-gray-2);
            cursor: pointer;
        }
        e-card .img:has(img) {
            height: var(--e-card-image-height, 6.5rem);
        }
        e-card .img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        e-card a {
            text-decoration: none;
            color: var(--e-color-primary);
        }
        e-card a:focus {
            outline: none;
            text-decoration: underline;
        }
        e-card:focus-within, e-card:hover {
            border: 2px solid var(--e-color-gray-3);
        }
        e-card:focus-within a:focus {
            text-decoration: none;
        }
        e-card .text {
            padding: 1rem;
            flex: 1 0 auto;
            display: flex;
            flex-direction: column;
        }
        e-card, e-card .text {
            display: flex;
            flex-direction: column;
        }

        e-card .text {
            flex-grow: 1;
        }

        e-card .text > * + * {
            margin-top: 0.75rem;
        }

        e-card .text :last-child {
            margin-top: auto;
        }

        e-card .text :nth-last-child(2) {
            margin-bottom: 0.75rem;
        }
    </style>
    <div class="img">
        <slot name="image"></slot>
    </div>
    <div class="text">
        <h2>
            ${href ? '<a href="' + href +'">' + title +'</a>' : title }
        </h2>
        <slot></slot>
    </div>
        `
    }

}

if (!customElements.get('e-card')) { 
    customElements.define('e-card', ECard)
}