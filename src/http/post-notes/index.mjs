import arc from '@architect/functions'
import { admin } from '@architect/shared/middleware.mjs'
import { create } from '@architect/shared/notes.mjs'

export let handler = arc.http.async(admin, createNote)

async function createNote (req) {

  // required properties
  let params = {
    content: req.body.content,
  }

  // optional properties
  if (req.body.ttl) params.ttl = req.body.ttl
  if (req.body.name) params.name = req.body.name

  let note = await create(params)

  // write to dynamo and shoot off webmention-sender async event
  await Promise.all([
    arc.events.publish({ 
      name: 'webmention-send', 
      payload: note
    }),
    arc.events.publish({ 
      name: 'populate-in-reply-to', 
      payload: note
    }),
  ])

  return {
    location: '/admin'
  }
}
