@app
indieweb

@plugins
payload-format

@static
fingerprint true

@events
webmention-send
webmention-receive

@http
# public reads
get /
get /admin # control plane for db.. could also add env vars?
get /notes/:entryID # note cannonical url
get /notes/:entryID/destroy # note destroy confirmation 
get /tags
get /tags/:tag # display a list of posts for the given tag

# private writes
post /notes # create note
post /notes/:entryID # update note
post /notes/:entryID/destroy # destroy note
post /login # uses env var for password
post /logout # nuke the sesh

# indieweb spec stuff
get /meta # indieauth-metadata endpoint
get /auth # indieauth consent screen
post /approve # indieauth approval flow
post /token # https://indieauth.spec.indieweb.org/#request
post /auth # https://indieauth.spec.indieweb.org/#request
post /webmention # https://webmention.net/draft/#receiving-webmentions
post /micropub # https://micropub.spec.indieweb.org

# catch all for 404
any /* 

@tables
# for internal shortlived access tokens
codes
  code *String
  ttl TTL

# for notes currently but other h-entry types will be added
entries
  pk *String # ex: note-2022
  sk **String # ex: note-2022-07-27 or reply-2022-08-01
  ttl TTL
  # content string
  # state string: published or deleted
  # type string: note, comment, repost, or like

@aws
profile personal
region us-west-2
architecture arm64
runtime nodejs16.x
