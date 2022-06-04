import layout from './layout.mjs'

export default function index ({ notes }) {
  let body = `
<section class=card>
  <h2>Notes</h2>
  ${ notes.Items.map(view).join('') }
</section>`
  return layout({ body })
}

function view (note) {
  return `<article>${ note.content }</article>`
}
