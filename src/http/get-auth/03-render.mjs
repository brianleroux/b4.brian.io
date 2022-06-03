import view from '@architect/views/auth.mjs'

export default async function render (req) {
  let website = req.query.client_id
  let scopes = req.query.scope.split(' ').filter(Boolean)
  let meta = req.meta
  return {
    html: view({ website, scopes, meta })
  }
}
