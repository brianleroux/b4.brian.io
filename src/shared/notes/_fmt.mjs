/** formatting helper */
export default function fmt (note) {
  note.entryID = note.sk
  delete note.pk
  delete note.sk
  return note
}
