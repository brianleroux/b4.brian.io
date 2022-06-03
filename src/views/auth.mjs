import layout from './layout.mjs'

export default function renderauth ({ website, scopes, meta, state, redirect_uri }) {
  
  let logo = meta?.logo? `<img src=${meta.logo}>` : ''

  let scope = ''
  if (scopes?.length > 0) {
    scope += `This application will be able to:`
    for (let s of scopes) {
      msg += `<li><label for=${s}>${s}</label> <input type=checkbox value=${s}>`
    }
  }

  let body = `
    <header>
      ${ logo }
      <h1>Authorize ${meta?.name || website} to use your account?</h1>
    </header>
    <form class=card-auth action=/approve method=post>
      <input type=hidden name=redirect_uri value=${ redirect_uri }>
      <input type=hidden name=state value=${ state }>
      ${ scope }
      <button> ✅ Authorize</button>
    </form>
  `

  return layout({ body, page:'auth' })
}
