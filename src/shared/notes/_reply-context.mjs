import arc from '@architect/functions'
import tiny from 'tiny-json-http'
import getHrefs from 'get-hrefs'
import { mf2 } from 'microformats-parser'

/** best effort attempt to get reply context */
export default async function replyContext (content) {
  let baseUrl = getHrefs(content)[0]
  if (baseUrl) {
    try {
      return read({ baseUrl })
    }
    catch (e) {
      console.log('swallowing', e) 
    }
  }
}

// looking for {icon, author, content, published, url }
async function read ({ baseUrl }) {
  let { body } = await tiny.get({ url:baseUrl })
  let { items, rels } = mf2(body, { baseUrl })

  // look for icon
  let icon = rels.icon? rels.icon[0] : false

  // look for author
  let hcard = items.find(o => o.type.includes('h-card'))
  let author = false
  if (hcard) {
    if (hcard.properties.name) author = hcard.properties.name[0]
  }

  // look for note content
  let content = false
  let url = false
  let published = false
  let hentry = items.find(o => o.type.includes('h-entry'))
  if (hentry) {
    if (hentry.properties.content) content = hentry.properties.content[0].value
    if (hentry.properties.url) url = hentry.properties.url[0]
    if (hentry.properties.published) published = hentry.properties.published[0]
    if (hentry.properties.author) {
      if (typeof hentry.properties.author[0] === 'string') {
        author = hentry.properties.author[0]
      }
      let ref = hentry.properties.author[0]
      if (typeof ref === 'object' && ref.type[0] === 'h-card' ) {
        author = hentry.properties.author[0].properties.name[0]
      }
    }
  }

  let res = { url: baseUrl }
  if (icon) res.icon = icon
  if (author) res.author = author
  if (content) res.content = content.substr(0, 240)
  if (url) res.url = url
  if (published) res.published = published
  return res
}
