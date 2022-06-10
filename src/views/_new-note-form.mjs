import form from './_note-form.mjs'

export default function noteForm (note) {
  return `
  <nav>
      <input 
        id=note 
        type=radio 
        name=tabset 
        aria-controls=note checked>
      <label for=note>Note</label>

      <input 
        id=comment 
        type=radio 
        name=tabset 
        aria-controls=comment>
      <label for=comment>Comment</label>

      <input 
        id=repost 
        type=radio 
        name=tabset 
        aria-controls=repost>
      <label for=repost>Repost</label>

      <input id=like type=radio name=tabset aria-controls=like>
      <label for=like>Like</label>
    
    <section class="tab new-note">
      ${ form({ edit: true, type: 'note' }) }
    </section>
    <section class="tab new-comment">
      ${ form({ edit: true, type: 'comment' }) }
    </section>
    <section class="tab new-repost">
      ${ form({ edit: true, type: 'repost' }) }
    </section>
    <section class="tab new-like">
      ${ form({ edit: true, type: 'like' }) }
    </section>
  </nav>`
}
