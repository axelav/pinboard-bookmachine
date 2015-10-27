
var h = require('hyperscript')
var map = require('lodash.map')
var keys = require('lodash.keys')

var Month = require('./Month')

module.exports = Months

function Months (data) {
  return h('div.months',
    map(data, function (x) {
      return Month(x)
    })
  )
}
