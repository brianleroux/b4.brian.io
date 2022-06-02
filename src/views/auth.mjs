export default function renderauth ({ website, scopes, meta }) {
  let msg = meta.logo? `<img src=${meta.logo}>` : ''
  msg += `<h1>Authorize ${meta.name || website} to use your account?</h1>`
  
  if (scopes) {
    msg += `This application will be able to:`
    for (let scope of scopes) {
      msg += `<li><label for=${scope}>${scope}</label> <input type=checkbox value=${scope}>`
    }
  }

  msg += `<button>Authorize</button>`

  return `<form action=/approve method=post>${ msg }</form><pre>${JSON.stringify({ meta, scopes }, null, 2)}</pre>`
}
