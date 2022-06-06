import arc from '@architect/functions'
import tiny from 'tiny-json-http'
//import getWebmentionEndpoint from './_get-webmention-endpoint.mjs'

export let handler = arc.events.subscribe(receive)

async function receive (payload) {

  console.log('received webmention', JSON.stringify(payload, null, 2))

  // ensure target and source exist and are different
  let { target, source } = payload
  if (!target) return
  if (!source) return
  if (target === source) return

  // attempt to read the target
  let targetReq = false 
  try {
    targetReq = await tiny.get({ url: target })
    // verify target is legit (can receive webmentions)
  }
  catch (e) {
    console.log('exiting due to bad target', e)
    return
  }

  // attempt to read the source
  let sourceReq = false
  try {
    let { body } = await tiny.get({ url: source })
    let { rels, items } = mf2(body, { baseUrl: href })
    if (Array.isArray(items)) {
      console.log('found items', items)
      let hentry = items.find(i => i.type === 'h-entry')
      let hcard = items.find(i => i.type === 'h-card')
      // if this is all true write the reply to the db!
    }
  }
  catch (e) {
    console.log('exiting due to bad source ', e)
    return
  }
}
