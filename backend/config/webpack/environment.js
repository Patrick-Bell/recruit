const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.config.merge({
  resolve: {
    fallback: {
      fs: false,
      net: false,
      tls: false,
      dgram: false,
      child_process: false,
    },
  },
})

environment.plugins.append(
  'Provide',
  new webpack.ProvidePlugin({
    process: 'process/browser',
  })
)

module.exports = environment
