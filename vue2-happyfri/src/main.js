
// Vue
import Vue from 'vue'
// https://router.vuejs.org/zh-cn/
// 将组件(components)映射到路由(routes)，控制渲染的模板
import VueRouter from 'vue-router'
// 加载设置的路由
import routes from './router/router'
// 加载文件夹下的所有，而不需要文件写到一起
// 状态记录，依赖于vuex实现
import store from './store/'
// ajax请求，原生代码，函数封装
import ajax from './config/ajax'
// 导入的样式，会被抽离出成一个单独的文件
import './style/common'
// 导入一个函数，想当于util.js，导入工具函数
import './config/rem'

// 通过调用全局方法 Vue.use() 使用插件；
Vue.use(VueRouter)

// 数组 
console.log('routes:', routes);
// 实例化一个路由对象
const router = new VueRouter({
	routes
})
console.log('router:', router);

// 实例化一个Vue实例
new Vue({
	router,
	store,
}).$mount('#app')
// $mount()，完全替换；
// $appendTo()，添加到内部；
// $remove()，移除dom；
// $destory()，将vm实例完全销毁，但是dom还存在，一并移除，添加true参数。

// 如果一个vue实例没有设置el属性那么它将处于一个"unmounted"的状态,
// 没有和dom元素联系在一起,
// vm.$mount会将实例装载在某个dom上,但直接vm.$mount()调用会将dom中的内容全部替换为vm的内容
// vm.$mount("body")则body中的内容会全被替换,
// 所以一般$mount()方法不填参数，之后通过dom方法将内容添加到dom中vm.$mount().$appendTo("#domId")。
// 
// $remove只是将vm实例的内容从dom中移除；
// 
// $destory则是将vm实例完全销毁,$destory()调用之后vm被销毁了,
// 但dom结构中已添加的渲染了的dom元素。
// vm template中的内容还存在,
// 想要一并移除则添加remove参数为ture即调用$destroy(true)