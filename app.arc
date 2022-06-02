@app
indieweb

@plugins
payload-format

@http
get /
get /login # hardcoded admin for now; could be github oauth or whatever
post /login # uses env var for password
post /logout # nuke the sesh
get /auth # indieauth authentication endpoint
get /token # indieauth token endpoint
get /microsub # indieweb microsub endpoint
any /* 

@tables
posts
  postID *String

@aws
profile personal
region us-west-2
architecture arm64
