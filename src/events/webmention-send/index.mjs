import arc from '@architect/functions'
import tiny from 'tiny-json-http'
import getHrefs from 'get-hrefs'
import { mf2 } from 'microformats-parser'

export let handler = arc.events.subscribe(sender)

async function sender ({ entryID, content, ttl, name }) {

  // log the incoming payload
  console.log(JSON.stringify({ entryID, content, ttl, name }, null, 2))

  // parse content for hrefs
  let hrefs = getHrefs(content)

  for (let href of hrefs) {
    try {

      // attempt to discover the webmention endpoint
      let { body } = await tiny.get({ url: href })

      // if not found look for html <link>
      let parsed = mf2(body, { baseUrl: href })

      // look for rels.webmention
      if (rels.webmention && Array.isArray(rels.webmention) && rels.webmention[0]) {

        // post mention if it exists
        await tiny.post({
          url: rels.webmention[0],
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            source: `https://${process.env.DOMAIN}/notes/${ entryID }`, 
            target: href
          }
        }) 
      }
    }
    catch (e) {
      // log failure and continue
      console.log('swallowing', e) 
    }
  }
}
