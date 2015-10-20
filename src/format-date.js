var days = require('days')
var months = require('months')

function formatDate (date) {
  return [
    days[date.getDay()],
    ', ',
    months[date.getMonth()],
    ' ',
    date.getDate(),
    ', ',
    date.getFullYear()
  ].join('')
}

module.exports = formatDate
