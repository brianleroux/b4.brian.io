import arc from '@architect/functions'
import fmt from './_fmt.mjs'
import replyContext from './_reply-context.mjs'

// @returns { entryID, state, content }
export default async function update ({ entryID, state, content, }) {

  if (!entryID)
    throw Error('missing_entryID')

  let pk = entryID.split('-').shift()
  let sk = entryID

  let updates = []
  let ExpressionAttributeNames = {}
  let ExpressionAttributeValues = {}

  if (state) {
    updates.push('#state = :state')
    ExpressionAttributeNames['#state'] = 'state'
    ExpressionAttributeValues[':state'] = state
  }

  if (content) {
    updates.push('#content = :content')
    ExpressionAttributeNames['#content'] = 'content'
    ExpressionAttributeValues[':content'] = content

    let context = await replyContext(content)
    if (context) {
      updates.push('#context = :context')
      ExpressionAttributeNames['#context'] = 'context'
      ExpressionAttributeValues[':context'] = context
    }
  }

  let data = await arc.tables()
  await data.entries.update({
    Key: { pk ,sk },
    UpdateExpression: `set ${updates.join(',')}`,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  })

  // read it back
  let n = await data.entries.get({pk, sk})
  let note = fmt(n)

  // send webmentions async
  await arc.events.publish({ 
    name: 'webmention-send', 
    payload: note
  })

  return note
}
