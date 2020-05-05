import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 全局组件注册
import GlobalComponent from '@/components/GlobalComponent.js';

Vue.component('global-component', GlobalComponent);
// console.log('Vue', Vue, typeof Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
