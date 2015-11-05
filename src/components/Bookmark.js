var h = require('hyperscript')
var map = require('lodash.map')
// FIXME: doesn't work; how to insert arbitrary html into hyperscript?
// var parser = require('html2hscript')
// var md = require('virtual-markdown')
var tovdom = require('to-virtual-dom')

module.exports = Bookmark

function Bookmark (data) {
  return h('li.bookmark',
    h('h4.title', data.description),
    h('a.href', {href: data.href}, data.href),
    if (data.extended.length)
    // h('div.extended', [
    //   tovdom(data.extended)
    //   md(data.extended)
    // ]),
    h('ul.tags',
      map(data.tags, function (x) {
        return h('li', x)
      })
    )
  )
}
