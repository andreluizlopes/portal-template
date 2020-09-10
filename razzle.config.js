'use strict'
const path = require('path')

module.exports = {
  plugins: ['scss'],
  modify (config, { target, dev }, webpack) {
    const appConfig = config
    if (!dev) {
      appConfig.performance = Object.assign({}, {
        maxAssetSize: 3500000,
        maxEntrypointSize: 3500000,
        hints: 'error'
      })
    }

    appConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    if (process.env.WEBPACK_ANALYZE) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      appConfig.plugins.push(new BundleAnalyzerPlugin())
    }

    return appConfig
  }
}
