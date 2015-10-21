var map = require('lodash.map')
var groupBy = require('lodash.groupby')

module.exports = prepareBookmarks

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
