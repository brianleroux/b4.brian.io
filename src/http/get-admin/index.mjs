import arc from '@architect/functions'
import login from '@architect/views/login.mjs'
import admin from '@architect/views/admin.mjs'
import list from '@architect/shared/notes/list.mjs'

export let handler = arc.http.async(render)

async function render (req) {
  if (req.session.loggedIn) {
    let data = await list() 
    if (req.query.json) {
      return { json: data }
    }
    return {
      html: admin({ notes: data.notes })
    }
  }
  else {
    return {
      html: login()
    }
  }
}


