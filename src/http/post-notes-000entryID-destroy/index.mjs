import arc from '@architect/functions'
import { admin } from '@architect/shared/middleware.mjs'
import { findNote } from '@architect/shared/middleware.mjs'
import destroy from '@architect/shared/notes/destroy.mjs'

export let handler = arc.http.async(admin, findNote, destroyer)

async function destroyer (req) {
  await destroy(req.note)
  return {
    location: '/admin'
  }
}
