/* global self */
const LIST = 'list'

self.onmessage = stateMachine

async function stateMachine ({ data }) {
  const { data: payload, type } = data
  const { sort, position } = payload
  switch (type) {
  case LIST:
    try {
        const result = await (await fetch(
            `/chart?sort=${sort}&position=${position}`, {
              credentials: 'same-origin',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: 'GET'
            }
          )).json()


      self.postMessage({
        type: LIST,
        result
      })
    } catch (err) {
      console.log(err)
    }
    break
  }
}
