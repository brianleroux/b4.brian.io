export default function renderauth ({ website, scopes }) {
  let msg = `<h1>Authorize ${website} to use your account?</h1>`
  if (scopes) {
    msg += `This application will be able to:`
    for (let scope of scopes) {
      msg += `<li><label for=${scope}>${scope}</label> <input type=checkbox value=${scope}>`
    }
  }
  msg += `<button>Authorize</button>`
  return `<form action=/authorize method=post>${ msg }</form>`
}
