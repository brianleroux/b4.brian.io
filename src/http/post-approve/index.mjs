import arc from '@architect/functions'
import createID from './_create-id.mjs'

export let handler = arc.http.async(fn)

async function fn (req) {

  let state = req.body.state
  let redirect_uri = req.body.redirect_uri

  let data = await arc.tables()
  let token = await data.codes.put({
    code: createID(),
    ttl: 300, // 300s == 5min
    state,
    redirect_uri,
  })

  let location = redirect_uri
  location += `?code=${ token.code }`
  location += `&state=${ state }`
  location += `&iss=https://${ process.env.DOMAIN }/`

  return { location }
}
