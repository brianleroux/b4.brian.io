import arc from '@architect/functions'
import tiny from 'tiny-json-http'
import getHrefs from 'get-hrefs'
import findWebmention from '@architect/shared/find-webmention-endpoint.mjs'

export let handler = arc.events.subscribe(sender)

async function sender ({ entryID, content, ttl, name }) {

  // log the incoming payload
  console.log(JSON.stringify({ entryID, content, ttl, name }, null, 2))

  // parse content for hrefs
  let hrefs = getHrefs(content)

  for (let href of hrefs) {
    try {

      // attempt to discover the webmention endpoint
      let url = await findWebmention(href)
      if (url) {

        // post mention if it exists
        await tiny.post({
          url,
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            source: `https://${process.env.DOMAIN}/notes/${ entryID }`, 
            target: href
          }
        }) 
      }
      else {
        // log not found for debugging
        console.log(`webmention endpoint not found for ${ href }`) 
      }
    }
    catch (e) {
      // log failure and continue
      console.log('swallowing', e) 
    }
  }
}
