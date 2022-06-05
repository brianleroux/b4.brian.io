import arc from '@architect/functions'

export let handler = arc.http.async(fn)

async function fn (req) {

  // required properties
  let params = {
    entryID: new Date(Date.now()).toISOString(),
    content: req.body.content
  }

  // optional properties
  if (req.body.ttl) params.ttl = req.body.ttl
  if (req.body.name) params.name = req.body.name

  // grab a data client
  let data = await arc.tables()

  // write to dynamo and shoot off webmention-sender async event
  await Promise.all([
    data.entries.put(params),
    arc.events.publish({ name: 'webmention-sending-created', payload: params }),
  ])

  return {
    location: '/admin'
  }
}
