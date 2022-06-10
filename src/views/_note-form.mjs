export default function noteForm (note) {

  let likeID = btoa(Date.now() * Math.random()).replace(/\=/g, '')
  let forms = {

    note: `
    <form action=/notes${note.entryID? '/' + note.entryID : ''} method=post>
      <input type=hidden name=type value=note>
      <textarea name=content 
        placeholder="entry content" 
        required>${note.content? note.content : ''}</textarea>
      <button>💾 ${note.entryID? 'Update' : 'Create'}</button>
    </form>`,

    comment: `
  <form action=/notes${note.entryID? '/' + note.entryID : ''} method=post>
    <input type=hidden name=type value=comment>
    <input type=text name=url placeholder="reply URL">
    <textarea name=content 
      placeholder="entry content" required>${note.content? note.content : ''}</textarea>
      <button>💾 ${note.entryID? 'Update' : 'Create'}</button>
  </form>`,

    repost: `
    <form action=/notes${note.entryID? '/' + note.entryID : ''} method=post>
      <input type=hidden name=type value=repost>
      <input type=text name=url placeholder="reply URL">
      <textarea name=content 
        placeholder="entry content" 
        required>${note.content? note.content : ''}</textarea>
        <button>💾 ${note.entryID? 'Update' : 'Create'}</button>
    </form>`,

    like: `
    <form action=/notes${note.entryID? '/' + note.entryID : ''} method=post>
      <input type=hidden name=type value=like>
      <input type=checkbox name=like class=toggle-heart id=${likeID}>
      <label for=${likeID} class=toggle-heart-label aria-label=like>❤</label>
      <input type=text name=url placeholder="reply URL">
      <button>💾 ${note.entryID? 'Update' : 'Create'}</button>
    </form>`,
  }

  return forms[note.type || 'note']
}
