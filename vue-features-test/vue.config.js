const path = require('path');

module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    // 设置路径别名
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
  productionSourceMap: false,
  devServer: {
    port: 8080,
  },
};
