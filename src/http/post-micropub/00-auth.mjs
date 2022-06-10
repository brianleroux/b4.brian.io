import { http, tables } from '@architect/functions'

export default async function auth ({ headers, body }) {
  // look for the token
  let token =  headers['Authorization'] || headers['authorization'] || body.auth_token
  if (!token) {
    return {
      code: 401,
      json {
        error: 'unauthorized',
        error_description: 'Request token invalid'
      }
    }
  }
  else {
    // verify token against db
    let data = await arc.tables()
    let found = await data.codes.get({ code: token })
    if (!found) {
      return {
        code: 403,
        json {
          error: 'forbidden',
          error_description: 'Request token not found'
        }
      }
    }
    else {
      // TODO check token expiry here
      // attach the token to the request
      req.token = found
    }
  }
}
