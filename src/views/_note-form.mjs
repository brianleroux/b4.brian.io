export default function noteForm (note) {

  let likeID = btoa(Date.now() * Math.random()).replace(/\=/g, '')
  let forms = {

    note: `
    <form action=/notes${note.entryID? '/' + note.entryID : ''} method=post>
      <textarea name=content 
        placeholder="entry content" 
        required>${note.content || ''}</textarea>
      <button>💾 ${note.entryID? 'Update' : 'Create'}</button>
    </form>`,

    comment: `
  <form action=/notes${note.entryID? '/' + note.entryID : ''} method=post>
    <input type=text 
      name=comment 
      value="${note.reply || ''}"
      placeholder="URL the comment replies to" 
      required>
    <textarea name=content 
      placeholder="entry content" required>${note.content? note.content : ''}</textarea>
      <button>💾 ${note.entryID? 'Update' : 'Create'}</button>
  </form>`,

    repost: `
    <form action=/notes${note.entryID? '/' + note.entryID : ''} method=post>
      <textarea name=content 
        placeholder="entry content">${note.content? note.content : ''}</textarea>
      <input type=text 
        name=repost 
        value="${note.reply || ''}"
        placeholder="URL being reposted" required>
      <button>💾 ${note.entryID? 'Update' : 'Create'}</button>
    </form>`,

    like: `
    <form action=/notes${note.entryID? '/' + note.entryID : ''} method=post>
      <label>❤</label>
      <input type=text 
        name=like 
        value="${note.reply || ''}"
        placeholder="URL you like" 
        required>
      <button>💾 ${note.entryID? 'Update' : 'Create'}</button>
    </form>`,
  }

  return forms[note.type || 'note']
}
