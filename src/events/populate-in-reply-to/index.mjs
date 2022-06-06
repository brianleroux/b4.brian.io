import arc from '@architect/functions'
import tiny from 'tiny-json-http'
import getHrefs from 'get-hrefs'
import { mf2 } from 'microformats-parser'
import { update } from '@architect/shared/notes.mjs'

export let handler = arc.events.subscribe(populateInReplyTo)

async function populateInReplyTo ({ entryID, content, ttl, name }) {

  // log the incoming payload
  console.log(JSON.stringify({ entryID, content, ttl, name }, null, 2))

  // parse content for hrefs
  let hrefs = getHrefs(content)

  for (let href of hrefs) {
    try {

      // attempt to discover the webmention endpoint
      let { body } = await tiny.get({ url: href })

      // if not found look for html <link>
      let { rels, items } = mf2(body, { baseUrl: href })

      if (Array.isArray(items)) {
        console.log('found items', items)
        let hentry = items.find(i => i.type === 'h-entry')
        let hcard = items.find(i => i.type === 'h-card')
        if (hcard && hentry) {
          let result = await update({
            entryID,
            context: { hentry, hcard }
          })
          console.log(result)
        }
      }
    }
    catch (e) {
      // log failure and continue
      console.log('swallowing', e) 
    }
  }
}
