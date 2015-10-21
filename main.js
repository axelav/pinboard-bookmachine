// TODO: check if db file exists, dl if not
//       could pass --force or --update to always dl file
//       credentials? API_KEY as env variable

var http = require('http')
var Router = require('routes-router')
// var app = require('routes-router')(routerConfig)
var h = require('hyperscript')
var sendJson = require('send-data/json')
var sendHtml = require('send-data/html')
var keys = require('lodash.keys')

// config
var userConfig = require('./conf/user')
var routerConfig = require('./conf/router')

// helpers
var prepareBookmarks = require('./src/prepare-bookmarks')
var render = require('./src/render')

// components
var Year = require('./src/components/Year')
var YearsList = require('./src/components/YearsList')

var bookmarksByYear = prepareBookmarks(require('./data/pinboard_all.json'))
var years = keys(bookmarksByYear)

var app = Router(routerConfig)

app.addRoute('/', function (req, res) {
  var html = render(YearsList, years)
  sendHtml(req, res, html)
})

app.addRoute('/year/:year', function (req, res, opts) {
  var data = {
    year: opts.params.year,
    startYear: years[0],
    volume: opts.params.year - years[0] + 1,
    user: userConfig,
    count: bookmarksByYear[opts.params.year].length,
    bookmarks: bookmarksByYear[opts.params.year]
  }
  var html = render(Year, data)

  sendHtml(req, res, html)
})

app.addRoute('/all', function (req, res, opts) {
  var data = {
    user: userConfig,
    bookmarks: bookmarksByYear
  }
  sendJson(req, res, data)
})

var server = http.createServer(app).listen(8000)
console.log('server listening on port 8000')
