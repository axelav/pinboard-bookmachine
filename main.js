// TODO: check if db file exists, dl if not
//       could pass --force or --update to always dl file
//       credentials? API_KEY as env variable

// var userConfig = require('./config/user')
// var routerConfig = require('./config/router')

var http = require('http')
var Router = require('routes-router')
// var app = require('routes-router')(routerConfig)
var h = require('hyperscript')
var sendJson = require('send-data/json')
var sendHtml = require('send-data/html')
var uniq = require('lodash.uniq')
var map = require('lodash.map')
var filter = require('lodash.filter')
var reduce = require('lodash.reduce')
var keys = require('lodash.keys')
var groupBy = require('lodash.groupby')
var assign = require('lodash.assign')
var months = require('months')

var formatDate = require('./src/format-date')

var bookmarksByYear = prepareBookmarks(require('./data/pinboard_all.json'))
var years = keys(bookmarksByYear)

// config
//
var userConfig = {
  fullname: 'Axel Anderson',
  username: 'axelav',
  title: 'A Year on the Internet'
}

var routerConfig = {
  notFound: function notFound (req, res) {
    sendJson(req, res, {
      statusCode: 404,
      body: { error: 'nope, that aint here' }
    })
  }
}

// main.js

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

// helpers
//
function prepareBookmarks (bookmarks) {
  return groupBy(map(bookmarks, function (bookmark) {
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
  }), 'year')
}

// components
//
function render (component, data) {
  return h('div.container',
    component(data)
  ).outerHTML
}

function Year (data) {
  var bookmarksByMonth = groupBy(data.bookmarks, function (x) {
    return new Date(x.datetime).getMonth()
  })
  return h('div.year',
    Front(data),
    Colophon(data),
    Cover(data),
    TOC(bookmarksByMonth),
    Months(bookmarksByMonth)
  )
}

function Months (data) {
  return h('div.months',
    map(keys(data), function (x) {
      return Month(assign(data[x], {month: months[x]}))
    })
  )
}

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

function Day (data) {
  // return h('div.day',
  //   h('h3', data[])
  // )
}

function Bookmarks (data) {
  return h('ul.bookmarks',
    map(data, function (x) {
      return Bookmark(x)
    })
  )
}

function Bookmark (data) {
  return h('li')
}

function YearsList (data) {
  return h('ul.year-list',
    map(data, function (x) {
      return YearsListItem(x)
    }),
    h('li',
      h('a', {href: 'all'}, 'all')
    )
  )
}

function YearsListItem (data) {
  return h('li',
    h('a', {href: 'year/' + data}, data)
  )
}

function Front (data) {
  return h('div.front',
    h('h2', data.user.title + ': ' + data.year)
  )
}

function Colophon (data) {
  var currentYear = (new Date).getFullYear()
  return h('div.colophon',
    h('p', '&copy; ' + data.startYear + '-' + currentYear + ' ' + data.user.fullname,
      h('br'),
      h('span', 'Data extracted from https://pinboard.in/u:' + data.user.username)
    )
  )
}

function Cover (data) {
  return h('div.cover',
    h('h1', data.user.title + ': ' + data.year),
    h('h2', data.user.fullname),
    h('h3', 'Volume ' + data.volume)
  )
}

function TOC (data) {
  return h('div.toc',
    h('h2', 'Contents'),
    h('ul.contents',
      map(keys(data), function (x) {
        return TOCItem(x)
      })
    )
  )
}

function TOCItem (data) {
  return h('li',
    h('a', {href: '#' + months[data].toLowerCase()}, months[data])
  )
}
