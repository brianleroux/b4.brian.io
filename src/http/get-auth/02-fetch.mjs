import { get } from 'tiny-json-http'
import { mf2 } from 'microformats-parser'

export default async function fetchClientID (req) {
  let client_id = req.query.client_id
  try {
    let raw = await get({ url: client_id })
    let parsed = mf2(raw.body, { baseUrl: client_id })
    req.meta = fmt(parsed)
  }
  catch(e) {
    req.meta = {errors: [e.message]}
  }
}

/** returns {name, logo, url} if possible */
function fmt (params) {
  let { items } = params
  if (items) {
    for (let i of items) {
      if (i.type == 'h-card' || i.type === 'h-app' || i.type == 'h-x-app') {
        let result = {}
        result.logo = i.properties.logo[0]
        result.name = i.properties.name[0]
        result.url = i.properties.url[0]
        return result
      }  
    }
  }
  else {
    return params
  }
}
