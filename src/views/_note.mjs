import arc from '@architect/functions'
import form from './_note-form.mjs'
import reply from './_in-reply-to.mjs'
import { friendly, fmt } from './_fmt-date.mjs'

export default function renderNote ({ entryID, type='note', content, context, edit=false }) {

  let body = edit === false? content : form({ entryID, type, content })
  let replying = context? reply(context) : ''

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
