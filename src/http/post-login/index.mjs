import arc from '@architect/functions'

export let handler = arc.http.async(login)

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
