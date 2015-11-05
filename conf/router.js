var sendJson = require('send-data/json')

var routerConfig = {
  notFound: function notFound (req, res) {
    sendJson(req, res, {
      statusCode: 404,
      body: { error: 'nope, that aint here' }
    })
  }
}

module.exports = routerConfig
