import arc from '@architect/functions'
import { admin } from '@architect/shared/middleware.mjs'
import { create } from '@architect/shared/notes.mjs'

export let handler = arc.http.async(admin, createNote)

async function createNote (req) {

  // required properties
  let note = {
    entryID: new Date(Date.now()).toISOString(),
    content: req.body.content,
    state: 'published', // published, deleted 
  }

  // optional properties
  if (req.body.ttl) note.ttl = req.body.ttl
  if (req.body.name) note.name = req.body.name

  // write to dynamo and shoot off webmention-sender async event
  await Promise.all([
    create(note),
    arc.events.publish({ 
      name: 'webmention-send', 
      payload: note
    })
  ])

  return {
    location: '/admin'
  }
}
