import { read } from '../tags.mjs'
import fmt from './_fmt.mjs'
import arc from '@architect/functions'

// FIXME only gets 25 records currently
export default async function getNotesForTag ({ tag }) {

  // lookup tag
  let results = await read({ tag }) 
  let tidy = sk => ({ pk: `note-${ sk.split('-').shift() }`, sk })
  let Keys = results.notes.map(tidy)

  // lookup notes with batchRead
  let data = await arc.tables()
  let tbl = data._name('entries')
  let expr = {
    RequestItems: {
      [tbl]: { Keys }
    }
  }

  let raw = await data._doc.batchGet(expr).promise()
  return { notes: raw.Responses[tbl].map(fmt) }
}
