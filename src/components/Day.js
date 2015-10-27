
var h = require('hyperscript')
var map = require('lodash.map')
var formatDate = require('../format-date')

var Bookmark = require('./Bookmark')

module.exports = Day

function Day (data) {
  var day = formatDate(data[0].datetime)
  return h('div.day',
    h('h3', day,
      map(data, function (x) {
        return Bookmark(x)
      })
    )
  )
}
