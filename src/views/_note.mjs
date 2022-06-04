import { friendly, fmt } from './_fmt-date.mjs'

export default function renderNote ({ entryID, name, content }) {
  let nom = name? `<h2 class=p-name>${ name }</h2>` : ''
  return `
  <article class=h-entry>

    ${ nom }

    <a class="p-author h-card" 
      href="http://${ process.env.DOMAIN }/">${ process.env.NAME }</a>

    <a class=u-url href="/notes/${ entryID }"><time class=dt-published title="${ friendly(entryID) }" datetime="${ entryID }">${ fmt(entryID) } &nbsp;🕓</time></a>

    <div class=e-content>${ content }</div>
  </article>
  `
}
