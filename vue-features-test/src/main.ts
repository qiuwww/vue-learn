import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

// 1. 全局组件注册
import GlobalComponent from '@/components/GlobalComponent.ts';
import MyPlugin from '@/plugins/MyPlugin';
Vue.component('global-component', GlobalComponent);
// console.log('Vue', Vue, typeof Vue);

// 2. 组件的全局混入
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  // created: function() {
  //   // 为自定义的选项 'myOption' 注入一个处理器。
  //   var myOption = this.$options.myOption;
  //   if (myOption) {
  //     console.log('####created，创建组件：', myOption);
  //   }
  // },
  // mounted: function() {
  //   console.log('####mounted，挂载组件：', this._uid, this.$route.name);
  // },
  // beforeDestroy: function() {
  //   console.log('####beforeDestroy，销毁组件：', this._uid, this.$route.name);
  // },
});

// 3. 全局指令
// 注册一个全局自定义指令 `v-focus`
// 默认页面加载，自动获取焦点的指令
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  },
});

// 4. 插件，插件都是全局的

Vue.use(MyPlugin);

// 全局错误处理函数
Vue.config.errorHandler = function(err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  alert(err);
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
