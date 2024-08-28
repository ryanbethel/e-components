import { readFileSync, writeFileSync } from 'fs'
import { join, parse, resolve } from 'path'
import { globSync } from 'glob'

const __dirname = new URL('../../..', import.meta.url).pathname

function createComponentWrappers() {
  const files = [...globSync('./app/elements/e/**/*.html')]
  files.forEach((srcPath) => {
    wrapOneComponent(srcPath)
  })
}

function wrapOneComponent(srcPath) {
  const componentsDir = join(__dirname, 'app', 'components', 'e')
  const template = readFileSync(resolve(__dirname, srcPath), { encoding: 'utf8' }).replace(/`/g, '\\`').replace(/\${/g, '\\${')
  const tag = parse(srcPath).name
  const wrapper = componentWrapper(tag, template)
  writeFileSync(join(componentsDir, `${tag}.mjs`), wrapper, { encoding: 'utf8' })
}

function componentWrapper(tag, template) {
  const className = (tag.charAt(0).toUpperCase() + tag.slice(1)).replace('-', '')
  return `import CustomElement from '@enhance/custom-element'

export default class ${className} extends CustomElement {
    render({ html, state }) {
        return html\`${template}\`
    }
}

if (!customElements.get("hf-${tag}")) { customElements.define("hf-${tag}", ${className}) };
`
}

export { createComponentWrappers, wrapOneComponent }
