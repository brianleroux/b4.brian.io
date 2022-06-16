import arc from '@architect/functions'
import fmt from './_fmt.mjs'
import replyContext from './_reply-context.mjs'

/**
 * every write goes to note-$YEAR
 * pk: note-2022
 * sk: 2022-06-05T20:54:47.582Z6-note
 *
 * list can then get all the notes for a given year;
 */

export default async function create ({ content, comment, repost, like, tags=[] }) {

  if (!content && !comment && !repost && !like) {
    throw Error('missing_param: expected one of content, comment, repost or like')
  }

  if (tags && !Array.isArray(tags)) {
    throw Error(`tags_invalid: expected an Array but got ${typeof tags}`)
  }

  let data = await arc.tables()
  let ts = new Date(Date.now()).toISOString()
  let pk = `note-${ ts.split('-').shift() }` // note-2022 
  let sk = ts

  let props = { 
    pk, 
    sk,
    published: ts, 
    state: 'published', 
    tags,
  }

  if (content) {
    let context = await replyContext(content)
    if (context)
      props.context = context
    props.content = content
  }

  if (comment) {
    props.reply = comment
    props.type = 'comment'
  }

  if (repost) {
    props.reply = repost
    props.type = 'repost'
  }

  if (like) {
    props.reply = like
    props.type = 'like'
  }

  // save note as an entry
  let result = await data.entries.put(props)
  let note = fmt(result)

  // save tag -> entry (getNotesForTag)
  let ops = tags.map(t =>  data.entries.put({ 
    pk: t, 
    sk: result.sk 
  }))

  // save tag (getAllTags)
  ops = ops.concat(tags.map( t => data.entries.put({
    pk: 'tags',
    sk: t
  })))
   
  await Promise.all(ops)

  // send webmentions async
  await arc.events.publish({ 
    name: 'webmention-send', 
    payload: note
  })

  return note
}
