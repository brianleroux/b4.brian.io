import arc from '@architect/functions'
import layout from './layout.mjs'

export default function renderTag ({ tag, notes }) {
  let body = `
<section class="card h-feed">
  <h2>Notes for <i>${ tag }</i></h2>
  <pre>${ JSON.stringify(notes, null ,2) }</pre>
</section>`
  return layout({ body })
}
