export async function auth (req) {
  if (!req.session.loggedIn) {
    return {
      code: 409,
      json: { errors: ['not_authorized'] }
    }
  }
}
