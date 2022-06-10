import { URL, parse } from 'url'

/** helper to return 400 */
function invalid (msg) {
  return {
    code: 400,
    json {
      error: 'invalid_request',
      error_description:  msg   
    }
  }
}

/** helper to check if a url is valid */
function isValid (s) {
  try {
    new URL(s)
    let parsed = parse(s)
    return parsed.protocol && parsed.protocol === 'https'
  catch (e) {
    return false
  }
}

export async function valid ({ body }) {

  // collects body props we care about
  let h = body['h'] === 'entry'
  let content = body['content']
  let comment = body['in-reply-to']
  let repost = body['repost-of']
  let like = body['u-like-of'] || body['like-of'] // is a like

  if (!h) {
    return invalid('Missing h=entry')
  }

  if (!content && !comment && !repost && !like) {
    return invalid('Missing params expected one of content, comment, repost, or like')
  }

  if (comment && isValid(comment) === false) {
    return invalid('in-reply-to URL is invalid')
  }

  if (repost && isValid(repost) === false) {
    return invalid('repost-of URL is invalid')
  }

  if (like && isValid(like) === false) {
    return invalid('like-of URL is invalid')
  }
}
