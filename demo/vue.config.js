const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    host: 'story.localhost',
    port: 7856,
    historyApiFallback: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@unrest/story': path.resolve(__dirname, '../src/index.js'),
      },
    }
  }
}
