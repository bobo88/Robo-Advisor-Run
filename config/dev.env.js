var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOCKET_URL: '"http://120.77.41.200:3000"',
  BASE_URL: '"http://119.23.35.234:8088"'
})
