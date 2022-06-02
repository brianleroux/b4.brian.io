export default function login({loggedIn}) {
  if (loggedIn) {
    return `welcome back brian.
    <form action=/logout method=post>
      <button>logout</button>
    </form>`
  }
  return `
<form action=/login method=post>
<input 
  type=password 
  name=password 
  placeholder="write friend and enter" required>
</form>
  `
}
