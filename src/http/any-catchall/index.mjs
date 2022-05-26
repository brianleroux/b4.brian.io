import { notFound } from '@architect/views/errors.mjs'

export async function handler (req) {
  return {
    statusCode: 404,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: notFound(req.rawPath)
  }
}
