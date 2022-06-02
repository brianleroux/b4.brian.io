import arc from '@architect/functions'
import render from '@architect/views/login.mjs'

export let handler = arc.http.async(login)

async function login (req) {
  return {
    html: render(req.session || {})
  }
}
