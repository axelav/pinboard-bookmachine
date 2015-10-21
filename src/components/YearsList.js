
var h = require('hyperscript')
var map = require('lodash.map')

var YearsListItem = require('./YearsListItem')

module.exports = YearsList

function YearsList (data) {
  return h('ul.year-list',
    map(data, function (x) {
      return YearsListItem(x)
    }),
    h('li',
      h('a', {href: 'all'}, 'all')
    )
  )
}
