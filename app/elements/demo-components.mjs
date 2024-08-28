export default function DemoComponent({ html, state }) {
  const components = state.store.components || []
  const current = state.store.current
  return html`
<style scope=global>
  demo-components {
    display:block;
  }
</style>
<hf-container >
  <hf-seperator></hf-seperator>
  <hf-row >
    <hf-col span="2">
      <hf-list type=none>
        <ul>
          ${components.map(item => item.path !== current ? `<li><hf-link><a href="/docs/${item.path || ""}" >${item.name || ""}</a></hf-link></li>` : `<li>${item.name || ""}</li>`).join('\n')}
        </ul>
      </hf-list>
    </hf-col>
    <hf-col span="10" class="editor">
      <ui-repl></ui-repl>
    </hf-col>
  </hf-row>
</hf-container>
 `
}
