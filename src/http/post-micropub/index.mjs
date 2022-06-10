import auth from './00-auth.mjs'
import valid from './01-valid.mjs'
import micropub from './02-micropub'

export let handler = http.async(auth, valid, micropub)
