export default function DemoComponent({ html, state }) {
  const components = state.store.components || []
  const current = state.store.current
  return html`
<style>
  :host {
    display:block;
  }
</style>
<e-list type=none>
  <ul>
    ${components.map(item => item.path !== current ? `<li><e-link><a href="/docs/${item.path || ""}" >${item.name || ""}</a></e-link></li>` : `<li>${item.name || ""}</li>`).join('\n')}
  </ul>
</e-list>
 `
}
