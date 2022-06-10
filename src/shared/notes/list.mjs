import arc from '@architect/functions'
import fmt from './_fmt.mjs'

// list ({ cursor? }): { cursor?, notes[] }
export default async function list (params={}) {

  let expr = {
    KeyConditionExpression: `#pk = :pk`,
    FilterExpression: `#state = :state`,
    ScanIndexForward: false,
    ConsistentRead: true,
    Limit: '7',
    ExpressionAttributeNames: {
      '#pk': 'pk',
      '#state': 'state'
    },
    ExpressionAttributeValues : {
      ':pk': `note-${ params.year || 2022 }`,
      ':state': 'published'
    }
  }

  if (params.cursor) {
    expr.ExclusiveStartKey = params.cursor
  }

  let data = await arc.tables()
  let raw = await data.entries.query(expr)

  let res = {
    notes: raw.Items.map(fmt)
  }

  if (raw.LastEvaluatedKey)
    res.cursor = raw.LastEvaluatedKey
  
  return res
}
