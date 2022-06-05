import arc from '@architect/functions'

export let handler = arc.http.async(fn)

async function fn (req) {

  // check for loggedIn
  let loggedIn = !!req.session.loggedIn 
  if (!loggedIn) {
    return {
      location: '/admin'
    }
  }

  // required properties
  let params = {
    entryID: req.params.entryID,
    content: req.body.content,
    updated: new Date(Date.now()).toISOString()
  }

  // optional properties
  if (req.body.ttl) params.ttl = req.body.ttl
  if (req.body.name) params.name = req.body.name

  // grab a data client
  let data = await arc.tables()
  let note = await data.entries.get({ entryID: req.params.entryID })
  if (!note) {
    return {
      location: '/admin'
    }
  }

  // write to dynamo and shoot off webmention-sender async event
  await Promise.all([
    data.entries.put(params),
    arc.events.publish({ 
      name: 'webmention-sending-updated', 
      payload: params 
    }),
  ])

  return {
    location: '/admin'
  }
}
