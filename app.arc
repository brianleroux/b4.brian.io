@app
indieweb

@plugins
payload-format

@static
fingerprint true

@http
get /
get /admin # control plane for db.. could also add env vars?
post /login # uses env var for password
post /logout # nuke the sesh

get /meta # indieauth-metadata endpoint
get /auth # indieauth consent screen
post /approve # indieauth approval flow
post /token # https://indieauth.spec.indieweb.org/#request
post /auth # https://indieauth.spec.indieweb.org/#request
get /microsub # indieweb microsub endpoint

any /* # catch all for 404

@tables
codes
  code *String
  ttl TTL

entries
  entryID *String #2022-07-27-my-title-here
  ttl TTL
  # content string
  # ts number

@aws
profile personal
region us-west-2
architecture arm64
runtime nodejs16.x
