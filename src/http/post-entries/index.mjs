import arc from '@architect/functions'

export let handler = arc.http.async(fn)

async function fn (req) {
  let params = {
    entryID: new Date(Date.now()).toISOString(),
    content: req.body.content
  }
  if (req.body.ttl) params.ttl = req.body.ttl
  if (req.body.name) params.name = req.body.name
  let data = await arc.tables()
  await data.entries.put(params)
  return {
    location: '/admin'
  }
}
