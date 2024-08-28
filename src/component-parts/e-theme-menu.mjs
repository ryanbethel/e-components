import { funWrapHTMLElement, wrapComponentCE, escString, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-theme-menu {
  hf-list {
    padding: var(--hf-space-sm);
    font-size: var(--hf-font-size-md);
  }
  hf-list li {
    padding: var(--hf-space-xs) 0;
  }

  hf-list hf-menu label {
    position: relative;
  }
  hf-menu hf-list label input{
    opacity: 0;
    position: absolute;
    left: 0;
  }
  hf-list label svg {
    width: 1em;
    height: 1em;
  }
}
`

const markupString = /*html*/`
  <hf-menu>
    <hf-button ord="primary" slot="trigger"><button>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path></svg>
    Theme
    </button></hf-button>

    <hf-list type=none slot="items">
    <ul type=none>
      <li>
      <hf-button ord=secondary>
        <label role=button >
          OS Default
          <input checked type=radio name=theme value=auto>
        </label>
      </hf-button>
      </li>

      <li>
      <hf-button ord=secondary>
        <label>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path></svg>
        Dark
        <input type=radio name=theme value=dark>
        </label>
      </hf-button>
      </li>

      <li>
      <hf-button ord=secondary>
        <label>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path></svg>
        Light
        <input type=radio name=theme value=light>
        </label>
      </hf-button>
      </li>
      </ul>

      </hf-list>
  </hf-menu>
`


const scriptString = /*javascript*/`
class ThemeMenu extends HTMLElement {
  constructor() {
    super();
    const darkLightTheme = window.localStorage.getItem('dark-light-theme');
    if (darkLightTheme === 'dark') { 
      document.documentElement.classList.add('dark-mode'); 
      document.documentElement.classList.remove('light-mode')
    } 
    if (darkLightTheme === 'light') { 
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode'); 
    } 
  }
  connectedCallback() {
      const isEnhanced = this.getAttribute('enhanced') === '✨'
      // client-side rendering
      if (!isEnhanced) {
        this.innerHTML = \`${markupString}\`
        this.setAttribute('enhanced', 'client')
      }
    this.autoThemeSelector = this.querySelector('input[type=radio][name=theme][value=auto]')
    this.darkThemeSelector = this.querySelector('input[type=radio][name=theme][value=dark]')
    this.lightThemeSelector = this.querySelector('input[type=radio][name=theme][value=light]')
    const themeSelectors = [this.autoThemeSelector, this.darkThemeSelector, this.lightThemeSelector]

    themeSelectors.forEach(selector => selector?.addEventListener('change', (e) => {
      if (e.target.checked) { this.setTheme(e.target.value) }
    });
  } 
  setTheme(theme) {
    if (theme === "light") {
      localStorage.setItem('dark-light-theme', 'light');
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    } else if (theme === "dark") {
      localStorage.setItem('dark-light-theme', 'dark');
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      localStorage.setItem('dark-light-theme', 'auto');
      document.documentElement.classList.remove('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  }
}
if (!customElements.get('hf-theme-menu')) {customElements.define('hf-theme-menu', ThemeMenu);}
`




const elementHTML = `
<style scope=global>
${indentChunk(cssString)}
</style>

${markupString}

<script type=module>
${indentChunk(scriptString)}
</script>
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-theme-menu', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
import CustomElement from '/_public/browser/custom-element.mjs'
export default class ThemeMenu extends CustomElement {
      constructor() {
        super();
        const darkLightTheme = window.localStorage.getItem('dark-light-theme');
        if (darkLightTheme === 'dark') { 
          document.documentElement.classList.add('dark-mode'); 
          document.documentElement.classList.remove('light-mode')
        } 
        if (darkLightTheme === 'light') { 
          document.documentElement.classList.add('light-mode')
          document.documentElement.classList.remove('dark-mode'); 
        } 
      }
      connectedCallback() {
        this.themeSelector = this.querySelector('input#themhf-toggle-checkbox')
        this.themeSelector?.addEventListener('change', (e) => {
          if (e.target.checked) {
          localStorage.setItem('dark-light-theme', 'dark');
          document.documentElement.classList.add('dark-mode')
          document.documentElement.classList.remove('light-mode')
          } else {
          localStorage.setItem('dark-light-theme', 'light');
          document.documentElement.classList.add('light-mode')
          document.documentElement.classList.remove('dark-mode')
          }
        });
      } 
      render({html,state}){ 
        return html\`
<style scope=global>
${indentChunk(escString(cssString))}
</style>
${escString(markupString)}
    \`
    }
    if (!customElements.get('hf-theme-menu')) {customElements.define('hf-theme-menu', ThemeMenu);}
    `

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
