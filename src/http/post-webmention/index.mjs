import arc from '@architect/functions'

export let handler = arc.http.async(fn)

async function fn (req) {
  await arc.events.publish({
    name: 'webmention-receive',
    payload: req.body
  })
  return {
    code: 202,
    html: ""
  }
}
