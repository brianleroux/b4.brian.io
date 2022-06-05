import arc from '@architect/functions'
import form from './_note-form.mjs'
import { friendly, fmt } from './_fmt-date.mjs'

export default function renderNote ({ entryID, name, content, edit=false }) {

  let nom = name? `<h2 class=p-name>${ name }</h2>` : ''
  let body = edit === false? content : form({ entryID, name, content })

  return `
  <article class=h-entry>
    ${ nom }
    ${ navbar({ entryID, edit }) }

    <div class=e-content>${ body }</div>
  
    <a class=p-category style=display:none href=/>uncategorized</a>
    <aside class="h-card p-author" style=display:none;>
      <a class="u-url u-uid" rel=me href=https://${ process.env.DOMAIN }>${ process.env.DOMAIN }</a>
      <img class=u-photo src=${ arc.static('/profile.jpg') }>
      <p class=p-name rel=author>${ process.env.NAME }</p>
    </aside>
  </article>
  `
}

function navbar({ entryID, edit=false }) {
  if (edit) {
    return `<nav>
      <a class=u-url href="/notes/${ entryID }"><time class=dt-published title="${ friendly(entryID) }" datetime="${ entryID }">${ fmt(entryID) } &nbsp;🕓</time></a>
      <a href="/notes/${ entryID }/destroy">☠️</a>
    </nav>`
  }
  else {
    return `<nav>
      <a class=u-url href="/notes/${ entryID }"><time class=dt-published title="${ friendly(entryID) }" datetime="${ entryID }">${ fmt(entryID) } &nbsp;🕓</time></a>
    </nav>`
  }
}
