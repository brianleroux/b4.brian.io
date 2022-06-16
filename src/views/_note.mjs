import arc from '@architect/functions'
import form from './_note-form.mjs'
import url from './_in-reply-to.mjs'
import { friendly, fmt } from './_fmt-date.mjs'

export default function renderNote ({ entryID, type='note', content='', context, reply, tags=[], edit=false }) {

  let body = edit === false? content : form({ entryID, type, content, reply })
  let replying = url(context || {url:reply})
  let categories = tags.length > 0? tags.map(t=> `<a href=/tags/${t}>${t}</a>`).join('') : '&nbsp;'

  return `
  <article class=h-entry>
    ${ navbar({ entryID, edit }) }
    <div class=e-content>${ body }</div>
    ${ replying }
    <a class=p-category style=display:none href=/>uncategorized</a>
    <aside 
      class="h-card p-author" 
      style=display:none;>
      <a 
        class="u-url u-uid" 
        rel=me 
        href=https://${ process.env.DOMAIN }>${ process.env.DOMAIN }</a>
      <img class=u-photo src=${ arc.static('/profile.jpg') }>
      <p class=p-name rel=author>${ process.env.NAME }</p>
    </aside>
    <blockquote>${ categories }</blockquote>
  </article>
  `
}

function navbar({ entryID, edit=false }) {
  if (edit) {
    return `<nav>
      <a class=u-url href="/notes/${ entryID }"><time class=dt-published title="${ friendly(entryID) }" datetime="${ entryID.replace('note-', '') }">${ fmt(entryID) } &nbsp;🕓</time></a>
      <a href="/notes/${ entryID }/destroy">☠️</a>
    </nav>`
  }
  else {
    return `<nav>
      <a class=u-url href="/notes/${ entryID }"><time class=dt-published title="${ friendly(entryID) }" datetime="${ entryID }">${ fmt(entryID) } &nbsp;🕓</time></a>
    </nav>`
  }
}
