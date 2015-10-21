
var h = require('hyperscript')
var map = require('lodash.map')

var Bookmark = require('./Bookmark')

module.exports = Bookmarks

function Bookmarks (data) {
  return h('ul.bookmarks',
    map(data, function (x) {
      return Bookmark(x)
    })
  )
}
