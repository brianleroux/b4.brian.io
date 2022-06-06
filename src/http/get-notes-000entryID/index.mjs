import arc from '@architect/functions'
import layout from '@architect/views/layout.mjs'
import render from '@architect/views/_note.mjs'
import { notFound, gone } from '@architect/views/errors.mjs'
import { friendly, fmt } from '@architect/views/_fmt-date.mjs'
import { read } from '@architect/shared/notes.mjs'

/** note; we are using a plugin for multiValueheaders */
export async function handler (req) {

  // see if we're destroying
  let entryID = req.pathParameters.entryID

  // read the note
  let note = await read({ entryID })
  if (!note) {
    return {
      statusCode: 404, 
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: notFound(entryID)
    }
  }

  // support webmention deleted
  if (note.state === 'deleted') {
    return {
      statusCode: 410, // Gone
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: gone(entryID)
    }
  }

  // setup disco headers
  let meta = `<https://${process.env.DOMAIN}/meta>; rel="indieauth-metadata"`
  let auth = `<https://${process.env.DOMAIN}/auth>; rel="authorization_endpoint"`
  let token = `<https://${process.env.DOMAIN}/token>; rel="token_endpoint"`
  let webmention = `<https://${process.env.DOMAIN}/webmention>; rel="webmention"`
  let card = `<section class=card>${ render(note) }</section>`

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    multiValueHeaders: {
      'Link': [meta, auth, token, webmention]
    },
    body: layout({ body: card })
  }
}
