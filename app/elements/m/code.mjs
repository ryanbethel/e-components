export default function Code({ html, state }) {
  const attrs = state.store.attrs
  const format = attrs.format || 'inline'
  return html`
<style>
/* Base code styles */
code,
pre {
  border-radius: var(--m-border-radius-md);
  background-color: var(--m-color-gray-1);
  color: var(--m-color-red-3);
}

/* Inline code */
code {
  padding: 1px 3px;
}

/* Multi-line code */
pre {
  margin: 0;
  padding: var(--m-space-xs) var(--m-space-sm);
}
</style>
${format === 'inline' ? '<code>' : '<pre>'}
  <slot></slot>
${format === 'inline' ? '</code>' : '</pre>'}
`
}

