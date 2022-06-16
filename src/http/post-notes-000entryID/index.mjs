import arc from '@architect/functions'
import { admin } from '@architect/shared/middleware.mjs'
import { findNote } from '@architect/shared/middleware.mjs'
import update from '@architect/shared/notes/update.mjs'

export let handler = arc.http.async(admin, findNote, updator)

async function updator (req) {
  req.note.content = req.body.content
  req.note.updated = new Date(Date.now()).toISOString()
  await update(req.note)
  return {
    location: '/admin'
  }
}
