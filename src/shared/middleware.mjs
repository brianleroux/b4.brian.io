export async function auth (req) {
  if (!req.session.loggedIn) {
    return {
      code: 409,
      json: { errors: ['not_authorized'] }
    }
  }
}

export async function admin (req) {
  let loggedIn = !!req.session.loggedIn 
  if (!loggedIn) {
    return {
      location: '/admin'
    }
  }
}
