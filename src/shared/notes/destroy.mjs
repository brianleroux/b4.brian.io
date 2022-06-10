import arc from '@architect/functions'

// @returns void
export default async function destroy ({ entryID }) {
  if (!entryID)
    throw Error('missing_entryID')
  let data = await arc.tables()
  let raw = await data.entries.get({
    pk: entryID.substr(0, 9),
    sk: entryID,
  })
  delete raw.content
  raw.state = 'deleted'
  await data.entries.put(raw)
}
