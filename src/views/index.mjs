import layout from './layout.mjs'
import render from './_note.mjs'

export default function index ({ notes }) {
  let body = `
<section class=card>
  <h2>Notes</h2>
  ${ notes.map(render).join('') }
</section>`
  return layout({ body })
}


