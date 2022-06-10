import arc from '@architect/functions'
import fmt from './_fmt.mjs'

// @returns { entryID, state, content }
export default async function update ({ entryID, state, content, context }) {

  if (!entryID)
    throw Error('missing_entryID')

  let pk = entryID.substr(0, 9)
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
  }

  if (context) {
    updates.push('#context = :context')
    ExpressionAttributeNames['#context'] = 'context'
    ExpressionAttributeValues[':context'] = context
  }

  let data = await arc.tables()
  await data.entries.update({
    Key: { pk ,sk },
    UpdateExpression: `set ${updates.join(',')}`,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  })
  let n = await data.entries.get({pk, sk})
  return fmt(n)
}
