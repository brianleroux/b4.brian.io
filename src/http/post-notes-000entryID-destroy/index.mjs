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
 
  // find the note in question
  let entryID = req.params.entryID
  let data = await arc.tables()
  let note = await data.entries.get({ entryID })
  if (!note) {
    return {
      location: '/admin'
    }
  }

  // write to dynamo and shoot off webmention-sender async event
  await Promise.all([
    data.entries.delete({ 
      entryID 
    }),
    arc.events.publish({ 
      name: 'webmention-sending-deleted', 
      payload: note
    }),
  ])

  return {
    location: '/admin'
  }
}
