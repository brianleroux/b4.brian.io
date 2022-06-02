import arc from '@architect/functions'
import auth from './00-auth.mjs'
import valid from './01-valid.mjs'
import fetches from './02-fetch.mjs'
import render from './03-render.mjs'

export let handler = arc.http.async(auth, valid, fetches, render)
