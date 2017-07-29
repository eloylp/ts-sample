require('./check-versions')()
const chalk = require('chalk')

const config = require('./config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const path = require('path')
const webpack = require('webpack')
const webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.test.conf')
  : require('./webpack.dev.conf')


webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
})
