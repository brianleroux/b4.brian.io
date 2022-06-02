/** this should ensure all expected params are present */
//https://b4.brian.io/auth?response_type=code&me=https%3A%2F%2Fb4.brian.io%2F&redirect_uri=https%3A%2F%2Findielogin.com%2Fredirect%2Findieauth&client_id=https%3A%2F%2Findielogin.com%2F&state=940ce4cd788850141d2de79e&code_challenge=0A1NdzeXPLpHFLT7ENRIbDg54erpHV6u7aeujL-WXVA&code_challenge_method=S256
export default async function valid (req) {

  console.log('HUP--->', JSON.stringify(req, null ,2))

  let problems = []

  let optional = [
    'scope', // A space-separated eg. "profile", or "profile create". 
    'me', // The URL that the user entered
    'code_challenge',  // SHOULD be required per spec but some clients don't do it yet
    'code_challenge_method', // SHOULD be required per spec but some clients don't do it yet  
    'response_type', // SHOULD be requiired; must equal 'code'
  ]

  if (req.query.response_type && req.query.response_type != 'code') {
    problems.push('invalid_response_type: expected "code"')
  }

  let required = [
    'client_id', 
    'redirect_uri', 
    'state',
  ]
  
  let keys = Object.keys(req.query)
  for (let key of required) {
    if (keys.includes(key) === false) {
      problems.push(`missing_${ key }`)
    }
  }

  if (problems.length) {
    return {
      code: 400,
      json: { errors: problems }
    }
  }
}
