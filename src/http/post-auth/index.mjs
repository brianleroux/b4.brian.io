/**
 * POST https://indieauth.example.com/auth
 * Content-type: application/x-www-form-urlencoded
 * Accept: application/json
 *
 * grant_type=authorization_code
 * &code=xxxxxxxx
 * &client_id=https://app.example.com/
 * &redirect_uri=https://app.example.com/redirect
 */
import arc from '@architect/functions'

export let handler = arc.http.async(verify, success)

async function verify (req) {

  let grant_type = req.body.grant_type
  let code = req.body.code
  let client_id = req.body.client_id
  let redirect_uri = req.body.redirect_uri

  let data = await arc.tables()
  let token = await data.codes.get({ code })
  if (!token) {
    return {
      code: 403,
      json: { errors: ['forbidden'] } 
    }   
  }
  else {
    // TODO check expiry here
    // found it! destroy the token and continue
    await data.codes.delete({ code })
  }
}

async function success () {
  return {
    json: {
      me: `https://${ process.env.DOMAIN }/`,
      profile: {
        name: `${ process.env.NAME }`,
        url: `https://${ process.env.DOMAIN }/`,
        photo: `https://${ process.env.DOMAIN }/${ arc.static('/profile.jpg') }`,
        email: ${ process.env.EMAIL }
      }
    }
  }
}
