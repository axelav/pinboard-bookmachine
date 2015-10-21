
var h = require('hyperscript')
var map = require('lodash.map')
var groupBy = require('lodash.groupby')

var Day = require('./Day')

module.exports = Month

function Month (data) {
  var bookmarksByDay = groupBy(data.bookmarks, function (x) {
    return new Date(x.datetime).getDay()
  })
  return h('div.month#' + data.month.toLowerCase(),
    h('h2', data.month),
    map(bookmarksByDay, function (x) {
      return Day (x)
    })
  )
}
