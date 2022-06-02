/** this should ensure all expected params are present */
export default async function valid (req) {

  let problems = []

  let optional = [
    'scope', // A space-separated eg. "profile", or "profile create". 
    'me', // The URL that the user entered
  ]

  if (req.query.scope && req.query.scope.trim().split(' ')[0] === '') {
    problems.push('invalid_scope: expected space seperated list of values')
  }

  let required = [
    'response_type', // must equal 'code'
    'client_id', 
    'redirect_uri', 
    'state',
    'code_challenge', 
    'code_challenge_method'//  e.g. "S256"
  ]
  
  let keys = Object.keys(req.query)
  for (let key of keys) {
    if (required.includes(key) === false) {
      problems.push(`missing_${ key }`)
    }
  }

  if (req.query?.response_type != 'code') {
    problems.push('invalid_response_type: expected "code"')
  }

  if (problems.length) {
    return {
      code: 400,
      json: { errors: problems }
    }
  }
}
