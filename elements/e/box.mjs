export default function Box({ html, state }) {
  return html`
<style scope=global>
e-box {
  display: block;
  border-radius: var(--e-border-radius-md);
  padding: var(--e-space-md);
  background-color: white;
  border: 1px solid var(--e-color-border);


  /*
    The ord attr is short for "ordinal" as in "ordinal number word".
    Ordinal number words are the 10+ words used for describing the
    precedence or importance of an item in an ordered list.
  */
  &[ord=secondary] {
    border: none;
    background-color: var(--e-color-gray-1);
    box-shadow: 0px 1px 2px var(--e-color-gray-3) inset;
  }

  & > header {
    border-top-left-radius: var(--e-border-radius-md);
    border-top-right-radius: var(--e-border-radius-md);
  }

  & + & {margin-top: var(--e-space-md) }
}

@media only screen and (max-width: 600px) {
  e-box { padding: var(--e-space-sm) }
}
</style>

<slot></slot>
`
}
