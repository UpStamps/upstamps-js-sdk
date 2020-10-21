
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./upstamps-js.cjs.production.min.js')
} else {
  module.exports = require('./upstamps-js.cjs.development.js')
}
