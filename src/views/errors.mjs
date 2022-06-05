import layout from './layout.mjs'

export function notFound (path) {
  return layout({ 
    body: `<section class=card>
      <h1>👻 ${path} not found</h1>
    </section>`
  })
}

export function gone (entryID) {
  return layout({ 
    body: `<section class=card>
      <h1>☠️  <code>${entryID}</code> has been deleted.</h1>
    </section>`
  })
}
