import arc from '@architect/functions'
import fmt from './_fmt.mjs'

// @returns { entryID, state, content }
export default async function read ({ entryID }) {
  let data = await arc.tables()
  let raw = await data.entries.get({
    pk: entryID.substr(0, 9),
    sk: entryID,
  })
  if (!raw) 
    throw Error(`not_found: ${ entryID }`)
  delete raw.pk
  delete raw.sk
  raw.entryID = entryID
  return raw
}
