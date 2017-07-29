const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.js'),
    assetsRoot: path.resolve(__dirname, '../../dist'),
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    port: 3000
  },
  test: {
    env: require('./test.env')
  }
}
