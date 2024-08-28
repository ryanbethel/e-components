import { funWrapHTMLElement, wrapComponentCE, escString, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-theme-switch {
  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
  }

  label[for=theme-toggle-checkbox] {
    position: relative;
    background-color: var(--hf-color-primary);
    width: 50px;
    height: 26px;
    border-radius: 50px;
    padding: 3px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  label .ball {
    background-color: var(--hf-color-primary-text);
    width: 22px;
    height: 22px;
    position: absolute;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    transition: transform 0.2s linear;
  }

  input#theme-toggle-checkbox:checked + label .ball {
    transform: translateX(24px);
  }
}
`

const markupString = /*html*/`
<input type="checkbox" id="theme-toggle-checkbox" name="theme-toggle" >
  <label for="theme-toggle-checkbox">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path></svg>
    <span class="ball"></span>
  </label>
`


const scriptString = /*html*/`
class ThemeSwitch extends HTMLElement {
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
    this.themeSelector = this.querySelector('input#theme-toggle-checkbox')
    this.themeSelector?.addEventListener('change', (e) => {
      const darkLightTheme = localStorage.getItem('dark-light-theme');
      const docClasses = Array.from(document.documentElement.classList)
      const isDarkClass = docClasses?.includes('dark-mode')
      const isLightClass = docClasses?.includes('light-mode')
      const isNoClass = !isDarkClass && !isLightClass
      const targetTheme = e.target.checked ? 'dark' : 'light'
      const targetDark = targetTheme === 'dark'
      const targetLight = targetTheme === 'light'
      const osAutoTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

      console.log({docClasses, isDarkClass,isLightClass,isNoClass, targetDark, targetLight,osAutoTheme})
      if (targetDark && (isDarkClass || (isNoClass && osAutoTheme==='dark'))) {
        this.setTheme('light')
        e.target.checked = false
      } else if (targetLight && (isLightClass || (isNoClass && osAutoTheme==='light'))) {
        this.setTheme('dark')
        e.target.checked = true
      } else if (targetDark) {
        this.setTheme('dark')
      } else if (targetLight) {
        this.setTheme('light')
      } 
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
if (!customElements.get('hf-theme-switch')) {customElements.define('hf-theme-switch', ThemeSwitch);}
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

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-theme-switch', htmlString: elementHTML })

const componentFunctionString = /*javascript*/`
import CustomElement from '/_public/browser/custom-element.mjs'
export default class ThemeSwitch extends CustomElement {
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
    if (!customElements.get('hf-theme-switch')) {customElements.define('hf-theme-switch', ThemeSwitch);}
}`

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
