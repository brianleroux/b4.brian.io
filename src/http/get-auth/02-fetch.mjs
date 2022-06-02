import { get } from 'tiny-json-http'
import { mf2 } from 'microformats-parser'

export default async function fetchClientID (req) {
  let client_id = req.query.client_id
  try {
    let raw = await get({ url: client_id })
    let parsed = mf2(raw.body, { baseUrl: client_id })
    req.meta = parsed
  }
  catch(e) {
    req.meta = {errors: [e.message]}
  }
}
