
var h = require('hyperscript')

module.exports = Cover

function Cover (data) {
  return h('div.cover',
    h('h1', data.user.title + ': ' + data.year),
    h('h2', data.user.fullname),
    h('h3', 'Volume ' + data.volume)
  )
}
