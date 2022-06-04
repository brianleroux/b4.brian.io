import layout from './layout.mjs'
import render from './_note.mjs'

export default function admin ({ notes }) {
  let edit = n => { n.edit = true; return n }
  let html = `
  <section class=card>
    <h2>Welcome back!</h2>
    <form action=/logout method=post>
      <button class=logout>👻 Logout ${ process.env.NAME }</button>
    </form>
  </section>
  <section class=card>
    <h2>New note</h2>
    <form action=/entries method=post>
      <input type=text name=name placeholder="name (optional)">
      <textarea name=content placeholder="entry content" required></textarea>
      <button>💾 Save new post</button>
    </form>
  </section>
  <section class=card>
    <h2>Notes</h2>
    ${ 
      notes.map(edit).map(render).join('') 
    }
  </section>
  `

  return layout({ body: html })
}
