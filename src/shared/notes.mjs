import arc from '@architect/functions'

/** formatting helper */
function fmt (note) {
  note.entryID = note.sk
  delete note.pk
  delete note.sk
  return note
}

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

/**
 * writes
 */

// @returns { entryID, state, content }
export async function create ({ content }) {
  if (!content || content.length === '') 
    throw Error('missing_content')
  let data = await arc.tables()
  let ts = new Date(Date.now()).toISOString()
  let pk = `note-${ ts.substr(0, 4) }`
  let sk = `note-${ ts }`
  let state = 'published'
  await data.entries.put({
    pk,
    sk,
    state,
    content
  })
  return { entryID: sk, state, content }
}

// @returns { entryID, state, content }
export async function update ({ entryID, state, content, context }) {
  if (!entryID)
    throw Error('missing_entryID')
  let updates = []
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
  let note = await data.entries.update({
    Key: { 
      pk: `note-${ entryID.substr(0, 4) }`, 
      sk : `note-${ entryID }`
    },
    UpdateExpression: `set ${updates.join(',')}`,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  })
  return fmt(note)
}

// @returns void
export async function destroy ({ entryID }) {
  if (!entryID)
    throw Error('missing_entryID')
  let data = await arc.tables()
  let raw = await data.entries.get({
    pk: entryID.substr(0, 9),
    sk: entryID,
  })
  delete raw.content
  raw.state = 'deleted'
  await data.entries.put(raw)
}

// 
export async function reply ({ entryID, content }) {
  if (!entryID)
    throw Error('missing_entryID')
  if (!content || content.length === '') 
    throw Error('missing_content')
  let data = await arc.tables()
  let pk = entryID
  let sk = `reply-${ new Date(Date.now()).toISOString() }`
  let state = 'published'
  await data.entries.put({
    pk,
    sk,
    state,
    content
  })
  return { entryID, replyID: sk, state, content }
}

/**
 * reads
 */

// @returns { entryID, state, content }
export async function read ({ entryID }) {
  let data = await arc.tables()
  let raw = await data.entries.get({
    pk: entryID.substr(0, 9),
    sk: entryID,
  })
  if (!raw) 
    throw Error(`not_found: ${ entryID }`)
  delete raw.pk
  delete raw.sk
  raw.entryID = entryID
  return raw
}

// list ({ cursor? }): { cursor?, notes[] }
export async function list (params={}) {

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
