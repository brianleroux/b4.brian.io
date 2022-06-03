import arc from '@architect/functions'

export default function layout({ body='', page='index' }) {
  let domain = process.env.ARC_ENV === 'testing'? 'localhost:3333' : process.env.DOMAIN
  let css = page === 'auth'? '/auth.css' : '/index.css'
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="indieauth-metadata" href="https://${domain}/meta">
  <link rel="authorization_endpoint" href="https://${domain}/auth">
  <link rel="token_endpoint" href="https://${domain}/token">
  <link rel="microsub" href="https://${domain}/microsub">
  <title>brian.io</title>
  <link rel="stylesheet" href="${ arc.static(css) }">
</head>
<body>
<nav>
  <p>@brianleroux</p>
  <a href="https://github.com/brianleroux" rel="me">🐙 gh</a>
  <a href="https://www.npmjs.com/~brianleroux" rel="me">🐴 npm</a>
  <a href="https://twitter.com/brianleroux" rel="me">🐦 twtr</a>
  <p>Work</p>
  <a href="https://begin.com">☀ begin</a>
  <p>Projects</p>
  <a href="https://arc.codes">🆕 arc.codes</a>
  <a href="https://cordova.apache.org">📲 cordova</a>
  <a href="https://wtfjs.com">⁉ wtfjs</a>
</nav>
<main>${ body }</main>
<footer class="h-card">
  <span class="p-name">Brian LeRoux</span>
  <span class="p-given-name">Brian</span>
  <span class="p-family-name">LeRoux</span>
  <div class="p-org">Begin</div>
  <img class="u-photo" src="${ arc.static('/profile.jpg') }">
  <a class="u-url" href="https://${ process.env.DOMAIN }">${ process.env.DOMAIN }</a>
  <a class="u-email" href="mailto:b@brian.io">b@brian.io</a>
  <abbr class="p-region" title="BC">BC</abbr>,
  <div class="p-country-name">Canada</div>
</footer>
</body>
</html>
`
}
