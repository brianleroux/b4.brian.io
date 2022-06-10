import arc from '@architect/functions'
import { admin } from '@architect/shared/middleware.mjs'
import read from '@architect/shared/notes/read.mjs'
import destroy from '@architect/shared/notes/destroy.mjs'

export let handler = arc.http.async(admin, destroyNote)

async function destroyNote (req) {

  // find the note in question
  let entryID = req.params.entryID
  let note = await read({ entryID })
  if (!note) {
    return {
      location: '/admin'
    }
  }

  // write to dynamo and shoot off webmention-sender async event
  await Promise.all([
    destroy(note),
    arc.events.publish({ 
      name: 'webmention-send', 
      payload: note,
    })
  ])

  return {
    location: '/admin'
  }
}
