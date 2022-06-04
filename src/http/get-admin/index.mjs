import arc from '@architect/functions'
import login from '@architect/views/login.mjs'
import admin from '@architect/views/admin.mjs'
import notes from '@architect/shared/notes.mjs'

export let handler = arc.http.async(render)

async function render (req) {
  if (req.session.loggedIn) {
    let data = await notes() 
    return {
      html: admin({ notes: data })
    }
  }
  else {
    return {
      html: login()
    }
  }
}


