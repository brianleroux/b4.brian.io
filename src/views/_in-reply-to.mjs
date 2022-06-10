export default function inReplyTo ({ icon, author, content, published, url }) {
  let img = icon && author? `<img src=${ icon } alt=${ author }>` : ''
  let name = author? `<p class="p-author h-card">${ author }</p>` : ''
  let preview = content? `<p class="p-content">${ content }</p>` : ''
  let when = published? `<time class="dt-published">${ published }</time>` : ''
  let where = `<a class="u-url" href="${ url }">${ when || '⚓︎' }</a>`
  return `<div class="u-in-reply-to h-cite">
  <strong>↳ In reply to</strong>
  ${ img }
  ${ name }
  ${ preview }
  ${ where }
 </div>`
}
