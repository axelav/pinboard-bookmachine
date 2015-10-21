
var h = require('hyperscript')

module.exports = render

function render (component, data) {
  return h('div.container',
    component(data)
  ).outerHTML
}
