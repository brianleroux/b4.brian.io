import layout from './layout.mjs'

export default function renderauth ({ website, scopes, meta }) {
  
  let logo = meta.logo? `<img src=${meta.logo}>` : ''

  let scope = ''
  if (scopes.length > 0) {
    scope += `This application will be able to:`
    for (let s of scopes) {
      msg += `<li><label for=${s}>${s}</label> <input type=checkbox value=${s}>`
    }
  }

  let body = `
    <header>
      ${ logo }
      <h1>Authorize ${meta.name || website} to use your account?</h1>
    </header>
    <form class=card-auth action=/approve method=post>
      ${ scope }
      <button> ✅ Authorize</button>
    </form>
    <pre style=display:none;>${JSON.stringify({ meta, scopes }, null, 2)}</pre>
  `

  return layout({ body, page:'auth' })
}
