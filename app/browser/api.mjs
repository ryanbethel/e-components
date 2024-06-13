import Store from '@enhance/store'

const store = Store()

export default function API() {
    initialize()

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

  async function list (sort = 'points', position = 'all') {
    const result = await (await fetch(
        `http://localhost:3333/chart?sort=${sort}&position=${position}`, {
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'GET'
        }
      )).json()
    store.chartData = result.chartData
  }

