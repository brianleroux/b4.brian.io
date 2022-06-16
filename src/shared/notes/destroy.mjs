import arc from '@architect/functions'
import fmt from './_fmt.mjs'

// @returns void
export default async function destroy ({ entryID }) {

  if (!entryID)
    throw Error('missing_entryID')

  // grab the raw record
  let data = await arc.tables()
  let raw = await data.entries.get({
    pk: `note-${ entryID.split('-').shift() }`,
    sk: entryID,
  })

  // make an immutable copy 
  let copy = fmt({ ...raw })

  // mark as deleted in the db
  // this is so we can 401 GONE
  delete raw.content
  raw.state = 'deleted'
  await data.entries.put(raw)

  // send any mentions
  await arc.events.publish({ 
    name: 'webmention-send', 
    payload: copy
  })
}
