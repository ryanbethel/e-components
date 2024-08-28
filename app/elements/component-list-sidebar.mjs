export default function DemoComponent({ html, state }) {
  const components = state.store.components || []
  const current = state.store.current
  return html`
<style>
  :host {
    display:block;
  }
</style>
<hf-list type=none>
  <ul>
    ${components.map(item => item.path !== current ? `<li><hf-link><a href="/docs/${item.path || ""}" >${item.name || ""}</a></hf-link></li>` : `<li>${item.name || ""}</li>`).join('\n')}
  </ul>
</hf-list>
 `
}
