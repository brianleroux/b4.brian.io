import arc from '@architect/functions'
import layout from '@architect/views/layout.mjs'
import { notFound } from '@architect/views/errors.mjs'
import { friendly, fmt } from '@architect/views/_fmt-date.mjs'

export let handler = arc.http.async(fn)

async function fn (req) {

  // read the session
  let loggedIn = !!(req.session?.loggedIn)

  // see if we're destroying
  let entryID = req.pathParameters.entryID

  // can't destroy unless logged in
  if (loggedIn === false) {
    return { location: '/admin' } 
  }

  // read the note
  let data = await arc.tables()
  let note = await data.entries.get({ entryID })
  if (!note) {
    return {
      code: 404,
      html: notFound(entryID)
    }
  }

  // display the confirmation
  let card = `<section class=card>
      <h1>Are you sure you want to destroy this note?</h1>
      <article class=h-entry>
        <nav>
        <a class=u-url href="/notes/${ entryID }"><time class=dt-published title="${ friendly(entryID) }" datetime="${ entryID }">${ fmt(entryID) } &nbsp;🕓</time></a>
      </nav>
      <div class=e-content>${ note.content }</div>
      </article>
      <form class=note-destroy action=/notes/${entryID}/destroy method=post>
        <p><button>💥 Destroy</button><span> or </span><a href=/admin>Cancel</a></p>
      </form>
    </section>`

  return {
    html: layout({ body: card })
  }
}
