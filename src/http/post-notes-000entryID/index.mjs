import arc from '@architect/functions'
import { admin } from '@architect/shared/middleware.mjs'
import { read, update } from '@architect/shared/notes.mjs'

export let handler = arc.http.async(admin, updateNote)

async function updateNote (req) {

  // check for note
  let entryID = req.params.entryID 
  let note = await read({ entryID })
  if (!note) {
    return {
      location: '/admin'
    }
  }

  // update the note
  note.content = req.body.content
  note.updated = new Date(Date.now()).toISOString()

  // optional properties
  if (req.body.ttl) note.ttl = req.body.ttl
  if (req.body.name) note.name = req.body.name

  // write to dynamo and shoot off webmention-sender async event
  await Promise.all([
    update(note),
    arc.events.publish({ 
      name: 'webmention-send', 
      payload: note
    })
  ])

  return {
    location: '/admin'
  }
}
