import arc from '@architect/functions'
import render from '@architect/views/auth.mjs'
import auth from './00-auth.mjs'
import valid from './01-valid.mjs'

export let handler = arc.http.async(auth, valid, fn)

async function fn (req) {
  let website = req.query.client_id
  let scopes = req.query.scope.split(' ')
  return {
    html: render({ website, scopes })
  }
}
