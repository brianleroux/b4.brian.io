import arc from '@architect/functions'
import tiny from 'tiny-json-http'
import { mf2 } from 'microformats-parser'
import findWebmention from '@architect/shared/find-webmention-endpoint.mjs'

export let handler = arc.events.subscribe(receive)

async function receive (payload) {

  console.log('received webmention', JSON.stringify(payload, null, 2))

  // verify target.. which should be us in this case
  // is legit (can receive webmentions)
  let endpoint = false 
  try {
    endpoint = await findWebmention(payload.target)
    console.log('found legit endpoint', endpoint)
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
