export default function Accordion({ html, state }) {
  return html`
<style scope=global>
e-accordion {
  display: block;

  & > details {
    border-top: 3px solid var(--e-color-gray-2);

    &:last-child { border-bottom: 3px solid var(--e-color-gray-2) }

    &[open] > summary:after {
      transform: rotate(180deg);
      transition: transform 250ms;
    }

    & > summary {
      padding: var(--e-space-sm) var(--e-space-xl) var(--e-space-sm) 0;
      position: relative;

      &:focus-visible { outline: 2px solid var(--e-color-focus) }

      &:after {
        font-family: 'e-icons';
        content: 'expand_more';
        position: absolute;
        top: var(--e-space-sm);
        right: var(--e-space-sm);
        transform: rotate(0deg);
        transition: transform 250ms;
      }
    }
  }
}
</style>
<slot></slot>
`}

