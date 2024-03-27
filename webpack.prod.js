const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
    mode: 'production',
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
    },
    optimization: {
        minimize: true,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
      },
      performance: {
        hints: false
      }  
   
  })

