var h = require('hyperscript')
var map = require('lodash.map')
// TODO: do these modules do what I want?
var he = require('he')
var Remarkable = require('remarkable');
var md = new Remarkable();

module.exports = Bookmark

function Bookmark (data) {
  return h('li.bookmark',
    // TODO: QR code
    // FIXME: escape characters, eg `\u00b7`
    h('h4.title', he.decode(data.description)),
    h('a.href', {href: data.href}, data.href),
    // TODO: run thru markdown filter
    h('div.extended', data.extended),
    h('ul.tags',
      map(data.tags, function (x) {
        return h('li', x)
      })
    )
  )
}
