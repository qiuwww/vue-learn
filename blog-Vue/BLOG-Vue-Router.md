---
title: Vue Router
---

[TOC]

## 是什么

Vue Router 是 Vue.js **官方的路由管理器**。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

1. **嵌套**的路由/视图表
2. **模块化**的、基于组件的路由配置
3. 路由**参数、查询、通配符**
4. 基于 Vue.js 过渡系统的**视图过渡效果**
5. 细粒度的导航控制
6. 带有自动激活的 CSS class 的链接
7. HTML5 **历史模式**或 hash 模式，在 IE9 中自动降级
8. 自定义的**滚动条行为**

## 两种路由模式

[mode](https://router.vuejs.org/zh/api/#mode)

1. 默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境)
2. 可选值: "hash" | "history" | "abstract"

### abstract

支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

### hash 模式

1. 使用 URL hash 值来作路由。**支持所有浏览器**，包括不支持 HTML5 History Api 的浏览器。
2. vue-router **默认 hash 模式** —— **使用 URL 的 hash 来模拟一个完整的 URL**，
3. 于是当 URL 改变时，页面**不会重新加载**。
4. 使用 **hashchange 事件和 location.hash**，来控制状态及事件处理。

特点：

1. hash 虽然在 URL 中，但不被包括在 HTTP 请求中；
2. 用来指导浏览器动作，对服务端安全无用，**hash 不会重加载页面**。

### history 模式

1. 依赖 HTML5 History API 和服务器配置，history 采用 HTML5 的新特性。
2. history 模式，这种模式充分利用 **history.pushState | replaceState API** 来完成 URL 跳转**而无须重新加载页面**。
3. 每当活动的历史记录项发生变化时， popstate 事件都会被传递给 window 对象。如果当前活动的历史记录项是被 pushState 创建的，或者是由 replaceState 改变的，那么 popstate 事件的状态属性 state 会包含一个当前历史记录状态对象的拷贝。使用示例请参见 **window.onpopstate 事件** 。
4. 历史模式还需要后台配置支持，因为这里的路由请求，会直接到服务端。
   1. 可以通过前端开启`基于 Node.js 的 Express`服务来支持的。

## 完整的 vue-router 导航解析流程

1. 匹配路径，找到要渲染的组件`<router-link :to="{ name: 'user', params: { userId: 123 }}"></router-link>`；
2. 视图位置渲染页面`<router-view name="b"></router-view>`

具体步骤：

1. 导航被触发。
2. 在失活的组件里调用**离开守卫**。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. **调用全局的** beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. **触发 DOM 更新**。
12. 用创建好的实例调用 beforeRouteEnter **守卫中传给 next 的回调函数**。

## 导航守卫

[官方介绍](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%AF%BC%E8%88%AA%E5%AE%88%E5%8D%AB)

主要就是通过接口记录了之前的操作。

1. 正如其名，vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：**全局的, 单个路由独享的, 或者组件级的**。

2. 记住参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 \$route 对象来应对这些变化，或使用 beforeRouteUpdate 的组件内守卫。

主要用到的守卫：

1. 全局前置守卫 beforeEach；
2. 全局解析守卫 beforeResolve；
3. 全局后置钩子 afterEach；
4. 组件内守卫
   1. beforeRouteEnter
   2. beforeRouteUpdate (2.2 新增)
   3. beforeRouteLeave

## $route和$router 的区别

1. `$route` 是“**路由信息对象**”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。

2. 而 `$router` 是“路由实例”对象包括了**路由的跳转方法，钩子函数**等。

## 路由懒加载（按需加载路由）

1. webpack 的代码分割功能：webpack 中提供了 `require.ensure()`来实现按需加载。目前已被`import()`方法替代；
2. ES6 的异步机制；
3. vue 异步组件实现懒加载。

```js
// 1. 进行页面按需加载的引入方式
const home = (r) => require.ensure([], () => r(require('../common/home.vue')));

// 2. ES的import接口，webpack先实现，可用
const HelloWorld = （）=>import('需要加载的模块地址');

// 3. Vue提供的，可以在组件中使用
component：resolve=>(require(['需要加载的路由的地址'])，resolve);
```

### 相应的组件懒加载可以查看组件部分

## popstate 与 hashchange

[popstate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event)

1. 需要注意的是**调用 history.pushState()或 history.replaceState()不会触发 popstate 事件**。
2. 只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 history.back()或者 history.forward()方法）

Seafault 的解释是

Vue-Router 底层调用的是 history.pushState
查阅 MDN 发现

注意 pushState() 绝对不会触发 hashchange 事件，即使新的 URL 与旧的 URL 仅哈希不同也是如此。
