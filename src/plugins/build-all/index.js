import { buildAll } from './build-all.js'

const plugin = {
  sandbox: {
    watcher: async function(params) {
      let { filename, /* event, */ inventory } = params
      const dest = new URL('../../..', import.meta.url).pathname
      if (filename.match(/component-parts\/.*\.mjs/)) {
        buildAll()
      }
    },
  },
}

export default plugin
