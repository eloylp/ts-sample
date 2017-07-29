const webpack = require('webpack')
const merge = require('webpack-merge')

const config = require('./config')
const baseWebpackConfig = require('./webpack.base.conf')

const env = process.env.NODE_ENV === 'testing'
  ? require('./config/test.env')
  : config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? 'source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
})

module.exports = webpackConfig
