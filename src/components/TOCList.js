
var h = require('hyperscript')
var map = require('lodash.map')
var keys = require('lodash.keys')

var TOCListItem = require('./TOCListItem')

module.exports = TOCList

function TOCList (data) {
  return h('div.toc',
    h('h2', 'Contents'),
    h('ul.contents',
      map(keys(data), function (x) {
        return TOCListItem(x)
      })
    )
  )
}
