import arc from '@architect/functions'

export let handler = arc.http.async(fn)

async function fn (req) {
  let location = req.body.location
  return { location }
}
