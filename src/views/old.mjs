export default function layout() {
  let domain = process.env.ARC_ENV === 'testing'? 'localhost:3333' : process.env.DOMAIN
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="authorization_endpoint" href="https://${domain}/auth">
  <link rel="token_endpoint" href="https://${domain}/token">
  <link rel="microsub" href="https://${domain}/microsub">
  <title>brian.io</title>
  <style>
     * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; } .max-width-320 { max-width: 20rem; } .margin-left-8 { margin-left: 0.5rem; } .margin-bottom-16 { margin-bottom: 1rem; } .margin-bottom-8 { margin-bottom: 0.5rem; } .padding-32 { padding: 2rem; } .color-grey { color: #333; } .color-black-link:hover { color: black; } 
nav {
  margin: 15% auto 0 auto;
  width: 200px;
  list-style: none;
  text-align: center;
}

a {
  display: block;
  text-decoration: none;
}

p {
  margin: 20px 0 0 0;
  font-style: oblique;
}

  </style>
</head>
<body>

<nav>
  <p>@brianleroux</p>
  <a href="https://github.com/brianleroux">🐙 gh</a>
  <a href="https://www.npmjs.com/~brianleroux">🐴 npm</a>
  <a href="https://twitter.com/brianleroux">🐦 twtr</a>

  <p>Work</p>
  <a href="https://begin.com">☀ begin</a>

  <p>Projects</p>
  <a href="https://arc.codes">🆕 arc.codes</a>
  <a href="https://github.com/smallwins/slack">🎉 slack</a>
  <a href="https://cordova.apache.org">📲 cordova</a>
  <a href="https://wtfjs.com">⁉ wtfjs</a>
</nav>






</body>

</html>
`
}
