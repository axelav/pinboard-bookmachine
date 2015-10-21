
var h = require('hyperscript')
var months = require('months')

module.exports = TOCListItem

function TOCListItem (data) {
  return h('li',
    h('a', {href: '#' + months[data].toLowerCase()}, months[data])
  )
}
