import { readFileSync, writeFileSync } from 'fs'
import { join, parse } from 'path'
import { globSync } from 'glob'

const __dirname = new URL('..', import.meta.url).pathname;

function createComponentWrappers () {
  const componentsDir = join(__dirname, 'components', 'e')
  const files = [ ...globSync('./elements/e/**/*.html') ]
  files.forEach((srcPath) => {
    const template = readFileSync(join(__dirname, srcPath), { encoding: 'utf8' })
    const tag = parse(srcPath).name
    const wrapper = componentWrapper(tag, template)
    writeFileSync(join(componentsDir, `${tag}.mjs`), wrapper, { encoding: 'utf8' });
  })
}

function componentWrapper(tag, template) {
  const className = (tag.charAt(0).toUpperCase() + tag.slice(1)).replace('-', '')
  return `import CustomElement from '@enhance/custom-element'

  export default class ${className} extends CustomElement {
      render({ html, state }) {
          return html\`${template}\`
      }
  }

  customElements.define("e-${tag}", ${className});
`
}

createComponentWrappers()
