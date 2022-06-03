@app
indieweb

@plugins
payload-format

@static
fingerprint true

@http
get /
get /login # hardcoded admin for now; could be github oauth or whatever
post /login # uses env var for password
post /logout # nuke the sesh
get /meta # indieauth-metadata endpoint
get /auth # indieauth authentication endpoint
post /approve # indieauth approval flow
post /token # https://indieauth.spec.indieweb.org/#request
post /auth # https://indieauth.spec.indieweb.org/#request
get /microsub # indieweb microsub endpoint
any /* # catch all for 404

@tables
codes
  code *String
  ttl TTL

@aws
profile personal
region us-west-2
architecture arm64
runtime nodejs16.x
