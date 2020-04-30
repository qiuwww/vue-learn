// webpack入口文件
import Vue from "vue";
import App from "./App";
import store from "./store";
import Loading from "./Loading";

console.log("main.js store", store);

// console.log(Vue.prototype);
console.log("###", Loading.show);
Loading.show()
// Vue.use(Loading);

// console.log(Vue.prototype);
/* eslint-disable no-new */
// 实例化一个Vue对象
new Vue({
  // Vuex.Store 对象
  store,
  el: "#app",
  render: (h) => h(App),
});
