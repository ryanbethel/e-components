import { updateComponent } from './update-components.js'

const plugin = {
  sandbox: {
    watcher: async function(params) {
      let { filename, /* event, */ inventory } = params
      const dest = new URL('../../..', import.meta.url).pathname
      if (filename.match(/src\/component-parts\/.*\.mjs/)) {
        const tagName = filename.match(/src\/component-parts\/(.*)\.mjs/)[1]
        await updateComponent(tagName)
      }
    },
  },
}

export default plugin
