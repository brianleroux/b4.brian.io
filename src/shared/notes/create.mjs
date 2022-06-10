import arc from '@architect/functions'
import fmt from './_fmt.mjs'

/**
 * store years supported in db
 *
 * pk: years-supported
 * years: [2022]
 *
 * every write goes to note-$YEAR
 * pk: note-2022
 * sk: note-2022-06-05T20:54:47.582Z6
 *
 * list can then get all the notes for a given year; query years supported to get total years
 */

// @returns { entryID, state, content }
export default async function create ({ content, comment, repost, like }) {

  if (!content && !comment && !repost && !like) {
    throw Error('missing_param: expected one of content, comment, repost or like')
  }

  let data = await arc.tables()
  let ts = new Date(Date.now()).toISOString()
  let pk = `note-${ ts.substr(0, 4) }` // note-2022 
  let sk = `note-${ ts }`

  let props = { 
    pk, 
    sk,
    published: ts, 
    state: 'published' 
  }

  if (content) {
    props.content = content
  }

  if (comment) {
    props.sk = `comment-${ ts }`
    props.reply = comment
  }

  if (repost) {
    props.sk = `repost-${ ts }`
    props.reply = repost
  }

  if (like) {
    props.sk = `like-${ ts }`
    props.reply = like
  }

  let result = await data.entries.put(props)
  return fmt(result)
}
