import arc from '@architect/functions'

// @param {cursor?}
// @returns { tags:[] }
export async function list (params={}) {
  let expr = {
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': 'tags',
    }
  }
  if (params.cursor) {
    expr.ExclusiveStartKey = params.cursor
  }
  let data = await arc.tables()
  let raw = await data.entries.query(expr)
  let res = {
    tags: raw.Items.map(t=> t.sk), 
    total: raw.ScannedCount,
  }
  if (raw.LastEvaluatedKey) {
    res.cursor = raw.LastEvaluatedKey
  }
  return res
}

export async function read (params={}) {
  let { tag, cursor } = params
  let data = await arc.tables()
  let raw = await data.entries.query({
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': tag,
    }
  })
  return { notes: raw.Items.map(t=> t.sk), total: raw.ScannedCount }
}
