const elementFunctionString = /*javascript*/`
export default function Card({ html, state }) {
  const { attrs } = state
  const { title = '', href = '' } = attrs
  return html\`
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
           \${href ? '<a href="' + href +'">' + title +'</a>' : title }
        </h2>
        <slot></slot>
    </div>

    <script type=module>
   class ECard extends HTMLElement {
       constructor(){
           super()
       }
       static get observedAttributes() {
         return ['href', 'title'];
       }

      attributeChangedCallback(name, oldValue, newValue) {
        const h2 = this.querySelector('div.title > h2')
        if (name === 'href') {
          const anchor = h2.querySelector('a')
          if (a && newValue) {
             anchor.setAttribute('href', newValue)
          }
          if (!a && newValue) {
            const title = h2.textContent
            h2.innerHTML = '<a href="'+newValue+'">'+title+'</a>'
          }
          if (!a && !newValue) {
          }
          if (a && !newValue) {
            const title = anchor.textContent
            h2.innerHTML = title
          }
        } else if (name === 'title') {
          const anchor = h2.querySelector('a')
          if (a) {
             anchor.textContent = newValue
          } else { 
             h2.textContent = newValue
          }
        }
      }

    connectedCallback() {
      const isEnhanced = this.hasAttribute('enhanced')
      // client-side rendering
      if (!isEnhanced) {
        const title = this.getAttribute('title')
        const href = this.getAttribute('href')
        const slottedImg = this.querySelector('[slot=image]')
        const div1 = document.createElement('div')
        div1.classList.add('img')
        div1.appendChild(slottedImg)
        const div2 = document.createElement('div')
        div2.classList.add('text')
        div2.innerHTML = '<h2>' + href ? '<a href="' + href +'">' + title +'</a>' : title + '</h2>'
        while (this.firstChild) {
          div2.appendChild(this.firstChild)
        }
        this.appendChild(div1)
        this.appendChild(div2)

        this.setAttribute('enhanced', 'client')
      }
    }

  }
  if (!customElements.get('e-card')) { customElements.define('e-card', ECard)}
  </script>
    \`
}
`




const componentFunctionString = /*javascript*/`
import CustomElement from '/_public/browser/custom-element.mjs'
export default class ECard extends CustomElement {
    constructor(){
        super()
    }
       static get observedAttributes() {
         return ['href', 'title'];
       }

      attributeChangedCallback(name, oldValue, newValue) {
        const h2 = this.querySelector('div.title > h2')
        if (name === 'href') {
          const anchor = h2.querySelector('a')
          if (a && newValue) {
             anchor.setAttribute('href', newValue)
          }
          if (!a && newValue) {
            const title = h2.textContent
            h2.innerHTML = '<a href="'+newValue+'">'+title+'</a>'
          }
          if (!a && !newValue) {
          }
          if (a && !newValue) {
            const title = anchor.textContent
            h2.innerHTML = title
          }
        } else if (name === 'title') {
          const anchor = h2.querySelector('a')
          if (a) {
             anchor.textContent = newValue
          } else { 
             h2.textContent = newValue
          }
        }
      }

    render({html,state}){
        return html\`
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
                    \${href ? '<a href="' + href +'">' + title +'</a>' : title }
                </h2>
                <slot></slot>
            </div>
        \`
    }

}
if (!customElements.get('e-card')) { customElements.define('e-card', ECard)}
`



export default {
  elementFunctionString,
  componentFunctionString
} 
