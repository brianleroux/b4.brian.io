import arc from '@architect/functions'
import login from '@architect/views/login.mjs'

export let handler = arc.http.async(fn)

async function fn (req) {
  return {
    html: login(req)
  }
}
