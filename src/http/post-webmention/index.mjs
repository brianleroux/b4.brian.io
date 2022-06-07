import arc from '@architect/functions'

/** receive webmentions */
export let handler = arc.http.async(log, valid, fn)

async function log (req) {
  console.log(JSON.stringify(req, null, 2))
}

async function valid (req) {
  let { target, source } = req.body
  let errors = []
  if (!target)
    errors.push('missing_target')
  if (!source)
    errors.push('missing_source')
  if (target?.startsWith('http') === false)
    errors.push('invalid_target')
  if (source?.startsWith('http') === false)
    errors.push('invalid_source')
  if (target === source)
    errors.push('invalid: source must not match target')
  if (errors.length > 0) {
    return {
      code: 400,
      json: { errors }
    }
  }
}

async function fn (req) {
  await arc.events.publish({
    name: 'webmention-receive',
    payload: req.body
  })
  return {
    code: 202,
    html: ""
  }
}
