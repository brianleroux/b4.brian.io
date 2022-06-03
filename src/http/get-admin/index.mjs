import arc from '@architect/functions'
import render from '@architect/views/admin.mjs'

export let handler = arc.http.async(admin)

async function admin (req) {
  return {
    html: render(req.session || {})
  }
}
