
var h = require('hyperscript')

module.exports = Front

function Front (data) {
  return h('div.front',
    h('h2', data.user.title + ': ' + data.year)
  )
}
