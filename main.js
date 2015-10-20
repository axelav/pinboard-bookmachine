// TODO: check if db file exists, dl if not
//       could pass --force or --update to always dl file
//       credentials? API_KEY as env variable

var http = require('http')
var Router = require('routes-router')
var sendJson = require('send-data/json')
var sendHtml = require('send-data/html')
var uniq = require('lodash.uniq')
var map = require('lodash.map')
var filter = require('lodash.filter')
var reduce = require('lodash.reduce')
var formatDate = require('./src/format-date')

var data = require('./data/pinboard_all.json')

var config = {
  firstname: 'Axel',
  lastname: 'Anderson',
  username: 'axelav',
  title: 'A Year on the Internet'
}

var bookmarks = prepareBookmarks(data)
var years = map(uniq(bookmarks, 'year'), 'year')
// var years = cacheYears(bookmarks)

function cacheYears (bookmarks) {
  return map(uniq(bookmarks, 'year'), 'year')
}

function prepareBookmarks (bookmarks) {
  return map(data, function (bookmark) {
    var date = new Date(bookmark.time)
    var tagsList = bookmark.tags.split(' ')

    return {
      href: bookmark.href,
      description: bookmark.description,
      extended: bookmark.extended,
      datetime: date,
      tags: tagsList,
      year: date.getFullYear()
    }
  })
}

var yearsTemplate = [
  '<ul>',
  map(years, function (y) {
    return [
      '<li>',
        '<a href="year/', y, '">',
          y,
        '</a>',
      '</li>'
    ].join('')
  }).join(''),
  '</ul>'
].join('')

var app = Router({
  notFound: function notFound (req, res) {
    sendJson(req, res, {
      statusCode: 404,
      body: { error: 'nope, that aint here' }
    })
  }
})

function getTotals (bookmarks) {
  var result = {}
  return map(years, function (year) {
    var yearTotal = filter(bookmarks, function (bookmark) {
      return bookmark.year === year
    }).length
    result[year] = yearTotal
    return result
  })
}

app.addRoute('/', function (req, res) {
  var data = {
    user: config,
    data: years,
    TOTALS: getTotals(bookmarks),
  }
  // sendJson(req, res, data)
  sendHtml(req, res, yearsTemplate)
})

app.addRoute('/year/:year', function (req, res, opts) {
  var data = {
    user: config,
    data: filter(bookmarks, 'year', parseInt(opts.params.year))
  }
  sendJson(req, res, data)
})

var server = http.createServer(app)
server.listen(8000)
console.log('server listening on port 8000')
