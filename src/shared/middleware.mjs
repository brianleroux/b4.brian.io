import read from './notes/read.mjs'

/** cheap public auth */
export async function auth (req) {
  if (!req.session.loggedIn) {
    return {
      code: 409,
      json: { errors: ['not_authorized'] }
    }
  }
}

/** cheap admin auth */
export async function admin (req) {
  let loggedIn = !!req.session.loggedIn 
  if (!loggedIn) {
    return {
      location: '/admin'
    }
  }
}

/** adds req.note or redirects away */
export async function findNote (req) {
  let entryID = req.params.entryID 
  let note = await read({ entryID })
  if (!note) {
    return {
      location: '/admin'
    }
  }
  req.note = note
}
