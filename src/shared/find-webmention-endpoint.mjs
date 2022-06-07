import tiny from 'tiny-json-http'
import { mf2 } from 'microformats-parser'

/**
 * Find a webmention endponit by URL
 *
 * @param {string} Fully qualified URL for webmention endpoint discovery
 * @returns {(string|boolean)} Either webmention endpoint URL as a string or false
 */
export default async function findWebmention (baseUrl) {

  // could speed up by only doing a HEAD but
  // many impl require parsing body markup anyhow
  let { headers, body } = await tiny.get({ url: baseUrl })
  
  // look for link header
  let link = headers.link || headers.Link
  if (link) {
    let links = link.split(',')// account for a multi value header
    for (let header of links) {
      let found = findEndpoint({ baseUrl, header })
      if (found) return found
    }
  }
  
  // look in the markup
  let raw = mf2(body, {baseUrl})
  let found = Array.isArray(raw.rels.webmention) && raw.rels.webmention.length > 0
  if (found) {
    return raw.rels.webmention[0]
  }
  
  // no endpoint was found
  return false
}

/** look at link header for endpoint */
function findEndpoint ({ baseUrl, header }) {  
  let expr = {
    rel: /rel[ ]*=[ ]*["|']?[ ]*(webmention)[ ]*["|']?/gm,// find rel=webmention
    url: /<(.*?)>/, // find values between <>
    absolute: /^https?:\/\//gm, // check for absolute vs relative url
  }
  let hasRel = expr.rel.test(header)
  if (hasRel) {
    let parts = header.match(expr.url)
    let found = Array.isArray(parts) && parts.length === 2
    if (found) {
      let url = parts[1]
      let isAbsolute = expr.absolute.test(url)
      return isAbsolute? url : `https://${ (new URL(baseUrl)).host }` + url
    }
  }
  // no endpoint found
  return false
}
