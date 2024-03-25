const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
      historyApiFallback: true,
      port: 80,
      static: {
        directory: path.resolve(__dirname, './dist'),
      },
      open: true,
      compress: true,
      hot: true,
      devMiddleware : {
        stats: {
          children: false,
          modules: false
        }
      }
    }
  })

