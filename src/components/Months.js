
var h = require('hyperscript')
var map = require('lodash.map')
var keys = require('lodash.keys')
var assign = require('lodash.assign')
var months = require('months')

var Month = require('./Month')

module.exports = Months

function Months (data) {
  return h('div.months',
    map(keys(data), function (x) {
      return Month(assign(data[x], {month: months[x]}))
    })
  )
}
