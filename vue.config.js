/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
// const url = 'http://pigx-gateway:9999'
const url = 'http://192.168.1.53:8887'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
  publicPath: './',
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  css: {
    // 忽略 CSS order 顺序警告
    extract: { ignoreOrder: true }
  },
  configureWebpack: (config) => {
    // if (process.env.NODE_ENV === 'production') {
    //   // 仅在生产环境下启用该配置
    //   return {
    //     performance: {
    //       // 打包后最大文件大小限制
    //       maxAssetSize: 1024000
    //     },
    //     plugins: [
    //       new CompressionWebpackPlugin({
    //         filename: '[path].gz[query]',
    //         algorithm: 'gzip',
    //         test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    //         threshold: 1024, // 只有大小大于该值的资源会被处理,当前配置为对于超过1k的数据进行处理，不足1k的可能会越压缩越大
    //         minRatio: 0.99, // 只有压缩率小于这个值的资源才会被处理
    //         deleteOriginalAssets: true // 删除原文件
    //       })
    //     ]
    //   }
    // }
  },
  // // 配置转发代理
  // devServer: {
  //   disableHostCheck: false,
  //   port: 8887,
  //   proxy: {
  //     '/': {
  //       target: url,
  //       ws: false, // 需要websocket 开启
  //       pathRewrite: {
  //         '^/': '/'
  //       }
  //     }
  //     // 3.5 以后不需要再配置
  //   }
  // }
}
