import arc from '@architect/functions'
import layout from './layout.mjs'

export default function renderTags ({ tags }) {
  let links = tags.map(t => `<a href=/tags/${ t }>${ t }</a>`).join('')
  let body = `
<section class="card h-feed">
  <h2>Tags</h2>
  ${ links } 
</section>`
  return layout({ body })
}
