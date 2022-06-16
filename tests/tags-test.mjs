import test from 'tape'
import sandbox from '@architect/sandbox'

import { read, list } from '../src/shared/tags.mjs'
import getNotesForTag from '../src/shared/notes/get-notes-for-tag.mjs'

test('start', async t => {
  t.plan(4)
  t.ok(typeof read === 'function', 'read is a function')
  t.ok(typeof list === 'function', 'list is a function')
  t.ok(typeof getNotesForTag === 'function', 'getNotesForTag is a function')
  await sandbox.start({quiet:true})
  t.pass('start')
})

test('view seed', async t => {
  t.plan(2)
  let res = await list({})
  t.ok(Array.isArray(res.tags), 'first page of tags')
  console.log(res)
  let first = res.tags[0]
  let found = await read({ tag: first })
  console.log(found)
  t.pass('cool move')
})

test('end', async t => {
  t.plan(1)
  await sandbox.end()
  t.pass('end')
})
