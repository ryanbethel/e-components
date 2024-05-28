export default function AutoComplete({ html, state }) {
  return html`<style scope="global">
    /* Base styles */
    e-autocomplete {
        display: block;

        /* Matches container */
        & > div {
            z-index: 1;
            overflow: hidden;
            min-width: 200px;

            & > ul li:hover {
                background-color: var(--e-color-gray-1);
            }
        }
    }

    /* When paired with label */
    fieldset label + e-autocomplete {
        margin-top: var(--e-space-xs);
    }
</style>
<div class="pad-sm fnt-italic txt-gray-5" >No results</div>
`
}
