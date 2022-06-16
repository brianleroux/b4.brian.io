import arc from '@architect/functions'
import fmt from './_fmt.mjs'

// @returns { entryID, state, content }
export default async function read ({ entryID }) {
  let data = await arc.tables()
  let raw = await data.entries.get({
    pk: `note-${ entryID.split('-').shift() }`,
    sk: entryID,
  })
  if (!raw) 
    throw Error(`not_found: ${ entryID }`)
  return fmt(raw)
}
