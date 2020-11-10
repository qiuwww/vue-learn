import Vue from 'vue';
import Index from './index.vue';

let messageInstance = null;
let MessageConstructor = Vue.extend(Index);

let init = () => {
  messageInstance = new MessageConstructor();
  messageInstance.$mount();
  document.body.appendChild(messageInstance.$el);
};

let caller = options => {
  if (!messageInstance) {
    init();
  }
  messageInstance.add(options);
};

export default {
  // 返回 install 函数 用于 Vue.use 注册
  install(vue) {
    // 注册到vue上，所有示例公用
    vue.prototype.$message = caller;
  }
};
