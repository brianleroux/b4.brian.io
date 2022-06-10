import arc from '@architect/functions'

export default function layout({ body='', page='index' }) {
  let domain = process.env.ARC_ENV === 'testing'? 'localhost:3333' : process.env.DOMAIN
  let css = '/index.css'
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="indieauth-metadata" href="https://${domain}/meta">
  <link rel="authorization_endpoint" href="https://${domain}/auth">
  <link rel="token_endpoint" href="https://${domain}/token">
  <link rel="webmention" href="https://${domain}/webmention">
  <link rel="micropub" href="https://${domain}/micropub">

  <title>brian.io</title>
  <link rel="stylesheet" href="${ arc.static(css) }">
  <style>
  /** https://unsplash.com/photos/i0K3-IHiXYI */
  .hero {
    background-image: url("${ arc.static('/hero.jpg') }");
  }
  </style>
</head>
<body>

<div class=hero-container>
  <div class=hero>&nbsp;</div>
</div>

<main>
  <nav>
    <header class="h-card card">
      <h1><a class="u-url u-uid" rel=me href=/>${ process.env.DOMAIN }</a></h1>
      <img class=u-photo src=${ arc.static('/profile.jpg') }>
      <p class=p-name>${ process.env.NAME }</p>
      <a class=u-email href=mailto:${ process.env.EMAIL }>✉️ ${ process.env.EMAIL }</a>
    </header>
    <section class="card">
      <h2>Elsewhere</h2>
      <a href=https://github.com/brianleroux rel=me>🐙 gh</a>
      <a href=https://www.npmjs.com/~brianleroux rel=me>🐴 npm</a>
      <a href=https://twitter.com/brianleroux rel=me>🐦 twtr</a>
      <a href=https://begin.com>☀ begin</a>
    </section>
    <section class="card">
      <h2>Projects</h2>
      <a href="https://arc.codes">🆕 fwa.dev</a>
      <a href="https://arc.codes">🔥 arc.codes</a>
      <a href="https://cordova.apache.org">📲 cordova</a>
      <a href="https://wtfjs.com">⁉ wtfjs</a>
    </section>
  </nav>
  <section class=content>${ body }</section>
</main>

</body>
</html>
`
}
