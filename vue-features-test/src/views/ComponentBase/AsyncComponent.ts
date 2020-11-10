import Vue from 'vue';
// 全局的
Vue.component('async-example', function(resolve, reject) {
  setTimeout(function() {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>',
    });
  }, 1000);
});

// 局部的
const MyAsyncCompoennt = new Vue({
  // ...
  components: {
    'my-async-component': () => import('./ComFourTemplate.vue'),
  },
});

export { MyAsyncCompoennt };
