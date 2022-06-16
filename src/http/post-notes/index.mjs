import arc from '@architect/functions'
import { admin } from '@architect/shared/middleware.mjs'
import create from '@architect/shared/notes/create.mjs'

export let handler = arc.http.async(admin, creator)

async function creator (req) {
  await create(req.body) 
  return {
    location: '/admin'
  }
}
