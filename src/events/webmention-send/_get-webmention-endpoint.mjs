import tiny from 'tiny-json-http'
import { mf2 } from 'microformats-parser'

export default async function getUrl (baseUrl) {
 
  let { headers, body } = await tiny.get({ url: baseUrl })
  
  // look for link header
  let link = headers.link || headers.Link
  if (link) {
    
    let expr = {
      rel: /rel[ ]*=[ ]*["|']?[ ]*(webmention)[ ]*["|']?/gm,
      url: /<(.*?)>/,
      absolute: /^https?:\/\//gm
    }
    
    // look for rel=webmention
    function findEndpoint(l) {  
      let hasRel = expr.rel.test(l)
      if (hasRel) {
        // look for webmention url
        let url = l.match(expr.url)
        if (Array.isArray(url) && url.length === 2) {
          url = url[1]
          // verify if the webmention url is absolute or relative
          let isAbsolute = expr.absolute.test(url)
          return isAbsolute? url : `https://${ (new URL(baseUrl)).host }` + url
        }
      }
    }
    
    // account for a multi value header
    let links = link.split(',')
    for (let l of links) {
      let possible = findEndpoint(l)
      if (possible) return possible
    }
  }
  
  let raw = mf2(body, {baseUrl})
  if (Array.isArray(raw.rels.webmention) && raw.rels.webmention.length > 0) 
    return raw.rels.webmention[0]
  
  // no link header found
  return false
}
