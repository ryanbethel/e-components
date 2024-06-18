import { wrapOneComponent } from './wrapper.js'

const plugin = {
  sandbox: {
    watcher: async function(params) {
      let { filename, /* event, */ inventory } = params
      const dest = new URL('../../..', import.meta.url).pathname
      if (filename.match(/app\/elements\/e\/.*\.html/)) {
        wrapOneComponent(filename, dest)
      }
    },
  },
}

export default plugin
