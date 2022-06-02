import arc from '@architect/functions'

let fn = arc.http.async(login)

export async function handler(req) {
  let res = await fn(req)
  console.log('====>', JSON.stringify(res, null, 2))
  return res
}

async function login (req) {
  if (!process.env.PASSWORD) {
    return {
      session: {},
      location: '/login?login_fail_password_undefined'
    }
  }
  else if (req.body?.password !== process.env.PASSWORD) {
    return {
      session: {},
      location: '/login?login_fail'
    }
  }
  else {
    return {
      session: { 
        loggedIn: true 
      },
      location: '/login'
    }
  }
}
