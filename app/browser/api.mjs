import Store from '@enhance/store'

const store = Store()
let worker

const LIST = 'list'

export default function API() {
  if (!worker) {
    worker =  new Worker('/_public/browser/worker.mjs')
    worker.onmessage = workerResponse

    initialize()
  }

    return {
      list,
      store,
      subscribe: store.subscribe,
      unsubscribe: store.unsubscribe
    }
}

  function initialize() {
    list()
  }

  function workerResponse(e) {
    const { data } = e
    const { result, type } = data
    switch (type) {
    case LIST:
      listMutation(result)
      break
    }
  }

  function listMutation({ chartData={} }) {
    store.chartData = chartData
  }

  async function list (sort = 'points', position = 'all') {
    worker.postMessage({
      type: LIST,
      data: { sort, position }
    })
  }

