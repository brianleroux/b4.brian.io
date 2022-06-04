import arc from '@architect/functions'
import layout from '@architect/views/layout.mjs'
import render from '@architect/views/_note.mjs'

/** note; we are using a plugin for multiValueheaders */
export async function handler (req) {
  let entryID = req.pathParameters.entryID
  let data = await arc.tables()
  let note = await data.entries.get({ entryID })
  let card = `<section class=card>${ render(note) }</section>`
  let meta = `<https://${process.env.DOMAIN}/meta>; rel="indieauth-metadata"`
  let auth = `<https://${process.env.DOMAIN}/auth>; rel="authorization_endpoint"`
  let token = `<https://${process.env.DOMAIN}/token>; rel="token_endpoint"`
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    multiValueHeaders: {
      'Link': [meta, auth, token]
    },
    body: layout({ body: card })
  }
}
