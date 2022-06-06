@app
indieweb

@plugins
payload-format

@static
fingerprint true

@events
webmention-send
populate-in-reply-to

@http
get /
get /admin # control plane for db.. could also add env vars?
get /notes/:entryID # note cannonical url
get /notes/:entryID/destroy # note destroy confirmation 
post /notes # create note
post /notes/:entryID # update note
post /notes/:entryID/destroy # destroy note
post /login # uses env var for password
post /logout # nuke the sesh

get /meta # indieauth-metadata endpoint
get /auth # indieauth consent screen
post /approve # indieauth approval flow
post /token # https://indieauth.spec.indieweb.org/#request
post /auth # https://indieauth.spec.indieweb.org/#request
get /microsub # indieweb microsub endpoint
# https://micropub.spec.indieweb.org

any /* # catch all for 404

@tables
codes
  code *String
  ttl TTL

entries
  pk *String #note-2022-07-27
  sk **String #note-2022-07-27 #reply-2022-08-01
  ttl TTL
  # content string
  # state string, one of published, deleted

@aws
profile personal
region us-west-2
architecture arm64
runtime nodejs16.x
