const path = require('path')

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@unrest/story': path.resolve(__dirname, '../src/index.js'),
      },
    }
  }
}
