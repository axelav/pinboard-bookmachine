
var h = require('hyperscript')

module.exports = Colophon

function Colophon (data) {
  var currentYear = (new Date).getFullYear()
  return h('div.colophon',
    h('p', '&copy; ' + data.startYear + '-' + currentYear + ' ' + data.user.fullname,
      h('br'),
      h('span', 'Data extracted from https://pinboard.in/u:' + data.user.username)
    )
  )
}
