const path = require('path')

const devServer = {
  host: 'story.localhost',
  port: 8211,
  historyApiFallback: true,
}

module.exports = {
  lintOnSave: false,
  devServer,
  configureWebpack: {
    resolve: {
      alias: {
        '@unrest/story': path.resolve(__dirname, '../src'),
      },
    },
  },
}
