
export default function noteForm (note) {
  return `
  <form action=/notes/${note.entryID? note.entryID : ''} method=post>
    <input type=text 
      style=display:none;
      name=name 
      placeholder="name (optional)" value="${note.name? note.name : ''}">
    <textarea name=content 
      placeholder="entry content" required>${note.content? note.content : ''}</textarea>
      <button>💾 ${note.entryID? 'Update' : 'Create'}</button>
  </form>`
}
