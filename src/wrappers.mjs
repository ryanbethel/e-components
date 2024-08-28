export function funWrapHTMLElement({ tag, htmlString }) {
  const funName = kebabToCamel(tag)
  return `
    export default function ${funName}({html}){
      return html\`${escString(htmlString)}\`
    }
  `
}
export function wrapComponentCE({ tag, cssString, markupString }) {
  const className = kebabToPascal(tag)
  const funString = /*javascript*/`
import CustomElement from '/_public/browser/custom-element.mjs'
export default class ${className} extends CustomElement {
    constructor(args){ super(args) }
    render({html}){
        return html\` 
<style scope=global>
${indentChunk(escString(cssString))}
</style>
${escString(markupString)}
          \`
    } 
}
if (!customElements.get("${tag}")) { customElements.define("${tag}", ${className}) };
`
  return funString
}

export function indentChunk(str, indent = '  ') {
  return str
    .split('\n')
    .map(line => indent + line)
    .join('\n');
}

function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}
function kebabToPascal(str) {
  return str.charAt(0).toUpperCase() + kebabToCamel(str).slice(1)
}
export function escString(str) { return str.replace(/`/g, '\\`').replace(/\${/g, '\\${') }
