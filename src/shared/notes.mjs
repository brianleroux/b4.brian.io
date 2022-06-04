import arc from '@architect/functions'

export default async function notes() {
  let data = await arc.tables()
  let raw = await data.entries.scan({})
  return raw.Items.sort(function sorter(a, b) {
    return (a.entryID < b.entryID) ? -1 : ((a.entryID > b.entryID) ? 1 : 0)
  }).reverse()
}
