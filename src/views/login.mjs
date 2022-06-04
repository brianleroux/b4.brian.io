import layout from './layout.mjs'

export default function login () {
  let html =  `
    <section class=card>
      <h2>Welcome back!</h2>
      <form action=/login method=post>
      <input 
        type=password 
        name=password 
        placeholder="Enter your password" required>
      </form>
      <button>🌵 Login</button>
    </section>
  `
  return layout({ body: html })
}
