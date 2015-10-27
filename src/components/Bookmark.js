var h = require('hyperscript')
var map = require('lodash.map')

module.exports = Bookmark

function Bookmark (data) {
  return h('li.bookmark',
    h('h4.title', data.description),
    h('a.href', {href: data.href}, data.href),
    h('div.extended', data.extended),
    h('ul.tags',
      map(data.tags, function (x) {
        return h('li', x)
      })
    )
  )
}
