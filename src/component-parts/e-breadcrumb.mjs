import { funWrapHTMLElement, wrapComponentCE, indentChunk } from "../wrappers.mjs"

const cssString = /*css*/`
e-breadcrumb {
    display: block;
}
e-breadcrumb,
e-breadcrumb > nav {
    display: flex;
}

e-breadcrumb
    > nav
    > :is(e-link, a, e-crumb, span):not(:first-child)::before {
    content: "/";
    display: inline-block; /* Needed to prevent this element from getting underlined */
    margin: 0 var(--e-space-sm);
    color: var(--e-color-gray-4);
}
`

const markupString = /*html*/`<slot></slot>`

const elementHTML = `
<style scope="global">
${indentChunk(cssString)}
</style>
${markupString}
`

const elementFunctionString = funWrapHTMLElement({ tag: 'e-breadcrumb', htmlString: elementHTML })

const componentFunctionString = wrapComponentCE({ tag: 'e-breadcrumb', cssString, markupString })

export default {
  elementHTML,
  elementFunctionString,
  componentFunctionString
} 
