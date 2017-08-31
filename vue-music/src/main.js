// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 未曾遗忘的青春
// 项目地址: https://github.com/IFmiss/vue-cloud-music

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router/router.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// swiper插件
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */

// console.log(router)

new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store: store,
  router: router,
  template: '<App/>',
  components: { App }
})

// new Vue({
//   router,
//   template: '<App/>',
//   components: { App }
// }).$mount('#app')
