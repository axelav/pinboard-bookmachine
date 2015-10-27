
var h = require('hyperscript')
var groupBy = require('lodash.groupby')

var Front = require('./Front')
var Colophon = require('./Colophon')
var Cover = require('./Cover')
var TOCList = require('./TOCList')
var Months = require('./Months')

module.exports = Year

function Year (data) {
  var bookmarksByMonth = groupBy(data.bookmarks, function (x) {
    return new Date(x.datetime).getMonth()
  })
  return h('div.year',
    Front(data),
    Colophon(data),
    Cover(data),
    TOCList(bookmarksByMonth),
    Months(bookmarksByMonth)
  )

  // TODO: create tag index
}
