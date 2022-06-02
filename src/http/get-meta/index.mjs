import arc from '@architect/functions'

export let handler = arc.http.async(meta)

async function meta (req) {
  return {
    json: {
      // stuff that is important
      issuer: `https://${ process.env.DOMAIN }/`,
      service_documentation: 'https://github.com/brianleroux/b4.brian.io',
      authorization_endpoint: `https://${ process.env.DOMAIN }/auth`,
      token_endpoint: `https://${ process.env.DOMAIN }/token`,
      // - scopes_supported (recommended) - ['create', 'update', 'etc] 

      // hardcoded spec defaults:
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code'],
      code_challenge_methods_supported: ['S256'],
      authorization_response_iss_parameter_supported: false,

      // spec is unclear on or option for the following params:
      //
      // - introspection_endpoint: `https://${ process.env.DOMAIN }/`,
      // - introspection_endpoint_auth_methods_supported
      // - revocation_endpoint
      // - revocation_endpoint_auth_methods_supported
      // - userinfo_endpoint (optional) - The User Info Endpoint
    }
  }
}
