const path = require('path');

module.exports = {
  lintOnSave: false,
  // webpack配置 - 简单配置方式
  configureWebpack: {
    resolve: {
      alias: {
        // 别名
        // 解决这个问题，使用的vue.js版本问题。You are using the runtime-only build of Vue where the template compiler is not available.
        vue$: 'vue/dist/vue.esm.js', // 加上这一句
        '@api': path.resolve(__dirname, './src/api'),
        '@utils': path.resolve(__dirname, './src/utils')
      },
      // 添加为可解析的扩展名。
      extensions: ['.vue', '.js']
    }
  },
  chainWebpack: config => {
    // 设置路径别名
    config.resolve.alias.set('@', path.resolve(__dirname, './src'));
  },
  productionSourceMap: false,
  devServer: {
    port: 8080
  }
};
