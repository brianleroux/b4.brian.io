import { create } from './@architect/shared/notes.mjs'

export default async function micropub (req) {
  let content = body['content']
  let comment = body['in-reply-to'] // is a comment
  let repost = body['repost-of'] // is a repost
  let like = body['u-like-of'] || body['like-of'] // is a like
  try {
    let note = await create({ content, comment, repost, like })
    return {
      statusCode: 201,
      headers: {
        location: `https://${ process.env.DOMAIN }/notes/${ note.entryID }`
      },
      json: { note }
    }
  }
  catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      json: {
        error: 'failed',
        error_description: e.message
      }
    }
  }
}
