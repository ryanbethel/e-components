import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
hf-breadcrumb {
    display: block;
}
hf-breadcrumb,
hf-breadcrumb > nav {
    display: flex;
}

hf-breadcrumb
    > nav
    > :is(hf-link, a, hf-crumb, span):not(:first-child)::before {
    content: "/";
    display: inline-block; /* Needed to prevent this element from getting underlined */
    margin: 0 var(--hf-space-sm);
    color: var(--hf-color-gray-4);
}
`

const markupString = /*html*/`<slot></slot>`

const elementHTML = `
<style scope="global">
${indentChunk(cssString)}
</style>
${markupString}
`

const elementFunctionString = funWrapHTMLElement({ tag: 'hf-breadcrumb', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'hf-breadcrumb', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
