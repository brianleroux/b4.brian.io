import view from '@architect/views/auth.mjs'

export default async function render (req) {
  let website = req.query.client_id
  let scopes = req.query.scope.split(' ').filter(Boolean)
  let meta = req.meta
  let state = req.query.state
  let redirect_uri = req.query.redirect_uri
  return {
    html: view({ website, scopes, meta, state })
  }
}
