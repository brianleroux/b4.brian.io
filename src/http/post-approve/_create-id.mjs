import { customAlphabet } from 'nanoid'

export default function createID() {
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let nanoid = customAlphabet(alphabet, 6)
  return nanoid()
}
