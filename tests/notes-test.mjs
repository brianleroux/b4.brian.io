import test from 'tape'
import sandbox from '@architect/sandbox'

import create from '../src/shared/notes/create.mjs'
import read from '../src/shared/notes/read.mjs'
import update from '../src/shared/notes/update.mjs'
import destroy from '../src/shared/notes/destroy.mjs'
import list from '../src/shared/notes/list.mjs'

test('start', async t => {
  t.plan(4)
  t.ok(typeof create === 'function', 'create is a function')
  t.ok(typeof update === 'function', 'update is a function')
  t.ok(typeof destroy === 'function', 'destroy is a function')
  await sandbox.start({quiet:true})
  t.pass('start')
})

test('clear seed', async t => {
  t.plan(2)
  let res = await list({})
  t.ok(Array.isArray(res.notes), 'first page of notes')
  for (let n of res.notes)
    await destroy(n)
  let res2 = await list({})
  t.ok(res2.notes.length === 0, 'no mo notes')
})

test('create', async t => {
  t.plan(4)
  let msg = 'number one to dr movenga'
  let result = await create({
    content: msg
  })
  t.ok(result, 'got result')
  t.ok(result.entryID, 'got result.entryID')
  t.ok(result.content && result.content === msg, 'got result.content')
  t.ok(result.state && result.state === 'published', 'got result.state')
  console.log(result)
})

test('update', async t => {
  t.plan(2)
  let result = await list({})
  console.log(result)
  t.ok(Array.isArray(result.notes) && result.notes.length === 1, 'got note')
  let note = result.notes[0]
  let msg = 'updated content'
  note.content = msg
  let res = await update(note)
  t.ok(res.content === msg, 'msg matches')
  console.log(res)
})

test('destroy', async t => {
  t.plan(3)
  let result = await list({})
  console.log(result)
  t.ok(Array.isArray(result.notes) && result.notes.length === 1, 'got note')
  let note = result.notes[0]
  await destroy(note)
  t.pass('destroyed note')
  let res = await list({})
  console.log(res)
  t.ok(Array.isArray(res.notes) && res.notes.length === 0, 'notes empty')
})

// list the first page of notes (none destroyed) pk: note-2022 sk: deleted-2030 
test('list', async t => {
  t.plan(1)
  await create({ content: 'one' })
  await create({ content: 'two' })
  await create({ content: 'three' })
  await create({ content: 'four' })
  await create({ content: 'five' })
  await create({ content: 'six' })
  await create({ content: 'seven' })
  await create({ content: 'eight' })
  await create({ content: 'nine' })
  await create({ content: 'ten' })
  let res = await list({})
  t.ok(Array.isArray(res.notes) && res.cursor, 'first page of notes')
  console.log(res)
})

// list the first page of notes (none destroyed)
test('test list after destroy', async t => {
  t.plan(4)
  let result = await list({})
  t.ok(Array.isArray(result.notes), 'got notes')
  let note = result.notes[0]
  await destroy(note)
  t.pass('destroyed note')
  let res = await list({})
  t.ok(res.notes.filter(n=> n.state === 'deleted').length === 0, 'only published')
  let n = await read({ entryID: note.entryID })
  t.ok(n.state === 'deleted', 'got deleted x for Gone responses')
})

test('end', async t => {
  t.plan(1)
  await sandbox.end()
  t.pass('end')
})
