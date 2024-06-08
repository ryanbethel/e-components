import CustomElement from '@enhance/custom-element'

export default class Breadcrumb extends CustomElement {
    render({ html, state }) {
        return html`<style scope="global">
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
</style>
<slot></slot>
`
    }
}

if (!customElements.get("e-breadcrumb")) { customElements.define("e-breadcrumb", Breadcrumb) };
