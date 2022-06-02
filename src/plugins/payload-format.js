/**
 * this incantation will set the HttpApi response payload
 * format to 1.0 which enables multiple headers
 * https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.response
 */
module.exports = {
  deploy: {
    async start ({ arc, cloudformation }) {
      if (!arc) console.log('missing arc')
      let base = cloudformation.Resources.HTTP.Properties.DefinitionBody.paths['/']
      base.get['x-amazon-apigateway-integration'].payloadFormatVersion = '1.0'
      return cloudformation
    }
  }
}
