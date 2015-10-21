
var h = require('hyperscript')

module.exports = YearsListItem

function YearsListItem (data) {
  return h('li',
    h('a', {href: 'year/' + data}, data)
  )
}
