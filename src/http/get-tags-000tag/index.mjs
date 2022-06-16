import getNotesForTag from '@architect/shared/notes/get-notes-for-tag.mjs'
import render from '@architect/views/tag.mjs'

/** note; we are using a plugin for multiValueheaders */
export async function handler (req) {

  let tag = req.pathParameters.tag
  if (!tag) {
    return {
      statusCode: 303,
      headers: { location: '/tags' }
    }
  }

  let notes = await getNotesForTag({ tag })

  let meta = `<https://${process.env.DOMAIN}/meta>; rel="indieauth-metadata"`
  let auth = `<https://${process.env.DOMAIN}/auth>; rel="authorization_endpoint"`
  let token = `<https://${process.env.DOMAIN}/token>; rel="token_endpoint"`
  let webmention = `<https://${process.env.DOMAIN}/webmention>; rel="webmention"`

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    multiValueHeaders: {
      'Link': [meta, auth, token, webmention]
    },
    body: render({ tag, notes })
  }
}
