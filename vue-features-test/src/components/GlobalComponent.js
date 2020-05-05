// 全局注册组件
// 需要在main.js中运行
const GlobalComponent = {
  props: ['message'],
  template: '<div><h1>组件定义之全局组件</h1><h4>{{message}}</h4></div>',
};

export default GlobalComponent;
