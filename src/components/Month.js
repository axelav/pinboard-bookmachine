
var h = require('hyperscript')
var map = require('lodash.map')
var groupBy = require('lodash.groupby')
var months = require('months')

var Day = require('./Day')

module.exports = Month

function Month (data) {
  var month = months[(data[0].datetime).getMonth()]
  var bookmarksByDay = groupBy(data, function (x) {
    return new Date(x.datetime).getDate()
  })
  return h('div.month#' + month.toLowerCase(),
    h('h2', month),
    map(bookmarksByDay, function (x) {
      return Day(x)
    })
  )
}
