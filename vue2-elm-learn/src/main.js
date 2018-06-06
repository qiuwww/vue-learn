
// 项目入口文件

import Vue from 'vue'
// vuex 当你要把 vue-router 添加进来，我们需要做的是，
// 将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们。
import VueRouter from 'vue-router'
// 页面路由
import routes from './router/router'
// 数据依赖
import store from './store/'
// 环境变量
import {routerMode} from './config/env'
// 添加一段js，来设置rem的值
import './config/rem'
// 用于消除移动端300ms的延迟的模块
import FastClick from 'fastclick'

// 当初始HTML文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，
// 而无需等待样式表、图像和子框架完成加载。另一个不同的事件 load 应该仅用于检测一个完全加载的页面。 
// 在使用 DOMContentLoaded 更加合适的情况下使用 load 是一个非常流行的错误，所以要谨慎。
// To instantiate FastClick on the body, which is the recommended method of use:
// 过滤事件
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

// 路由处理
Vue.use(VueRouter)
// 一个 route object（路由信息对象） 表示当前激活的路由的状态信息，
// 包含了当前 URL 解析得到的信息，还有 URL 匹配到的 route records（路由记录）。
const router = new VueRouter({
	// RouteConfig 的类型定义：
	routes,
	// 配置路由模式
	mode: routerMode,
	// Vue路由 严格模式
	strict: process.env.NODE_ENV !== 'production',
	// 滚动行为
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition ||0}
		}
	}
})

new Vue({
	router,
	// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件，这里配合Vue.use(Vuex)；同理对于vue-router
	store,
}).$mount('#app')

