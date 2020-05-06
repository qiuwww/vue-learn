---
title: Vue-SSR
date: 2018-6-6
tags:
  - Vue
  - SSR
categories:
  - Vue
  - SSR
---

[查看 demo](../vue-ssr)

## 什么是服务器端渲染 (SSR)

1. 浏览器请求 url，服务端返回一个**渲染好首屏的 html**；
2. 相较于 spa，对于多个路由，会返回多个页面，页面的 head 信息不尽相同；
3. 基本一渲染好的，不像 spa，只有一个根节点，页面全靠 js 渲染；

[服务端渲染](../imgs/服务端渲染.jpg)

## 为什么使用服务器端渲染 (SSR)

与传统 SPA (单页应用程序 (Single-Page Application)) 相比，服务器端渲染 (SSR) 的优势主要在于：

1. 更好的 SEO，由于**搜索引擎爬虫**抓取工具**可以直接查看完全渲染的页面**。
   1. 如果 SEO 对你的站点至关重要，而你的**页面又是异步获取内容**，则你可能需要服务器端渲染(SSR)解决此问题。
2. 更快的内容**到达时间 (time-to-content)**，特别是对于缓慢的网络情况或运行缓慢的设备。
   1. 不需要等待有的 JavaScript 都完成下载并执行；

### 服务器端渲染 (SSR) 时还需要有一些权衡之处 ｜ 劣势

1. 开发条件所限；
   1. 浏览器特定的代码，只能在某些生命周期钩子函数 (lifecycle hook) 中使用；
2. 涉及构建设置和部署的更多要求：
   1. 与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，**需要处于 Node.js server 运行环境**。
3. 更多的服务器端负载。

## SSR 的使用场景

1. 如果对**首屏性能要求比较高**的情况下，可以使用相关框架的 SSR；
2. 比较关注 SEO；

## SSR 基本构建

1. 基础依赖：vue、vue-server-renderer；
2. 服务端代码，请求返回一个使用 Vue 渲染的页面；

### 页面构建核心代码

[ssr](../vue-ssr/src/express-server.js)

```js
const Vue = require('vue');
// 第 2 步：创建一个 renderer
// 可以添加渲染模板，注意 <!--vue-ssr-outlet--> 注释 -- 这里将是应用程序 HTML 标记注入的地方。
const renderer = require('vue-server-renderer').createRenderer();
// 第 1 步：创建一个 Vue 实例
const app = new Vue({
  data: {
    url: req.url,
  },
  template: `<div>访问的 URL 是： {{ url }}</div>`,
});
// 第 3 步：将 Vue 实例渲染为 HTML
// 如果没有传入回调函数，则会返回 Promise
renderer.renderToString(app, (err, html) => {
  if (err) {
    res.status(500).end('Internal Server Error');
    return;
  }
});
```

### 数据处理

1. 每个请求应该都是全新的、独立的应用程序实例，以便不会有交叉请求造成的状态污染 (cross-request state pollution)。
2. 在服务器上“预取”数据 ("pre-fetching" data) - 这意味着在我们开始渲染时，我们的应用程序就已经解析完成其状态。
3. 组件生命周期钩子函数：
   1. 由于没有动态更新，所有的生命周期钩子函数中，**只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用**。这就是说任何其他生命周期钩子函数中的代码（例如 beforeMount 或 mounted），只会在客户端执行。
   2. 你应该**避免在 beforeCreate 和 created 生命周期时产生全局副作用的代码**。

### [带你五步学会 Vue SSR](https://segmentfault.com/a/1190000016637877)

完成 SSR 的配置：

1. 纯浏览器渲染，spa；
2. 服务端渲染，不包含 Ajax 初始化数据；
   1. 服务端渲染 SSR，类似于同构，**最终要让一份代码既可以在服务端运行，也可以在客户端运行**。
   2. 如果说在 SSR 的过程中出现问题，还可以回滚到纯浏览器渲染，保证用户正常看到页面。
3. 服务端渲染，包含 Ajax 初始化数据；

   1. 服务器端渲染和浏览器端渲染组件经过的生命周期是有区别的，**在服务器端，只会经历 beforeCreate 和 created 两个生命周期**。
   2. 所以获取异步数据的基本思路：将获取的数据转为代码，传递到浏览器端：
      1. 在渲染前，要预先获取所有需要的异步数据，然后存到 Vuex 的 store 中。
      2. 在后端渲染时，**通过 Vuex 将获取到的数据注入到相应组件中**。
      3. 完全可以当作一个 js 标签，注入到页面中，读取之后可以删除；
      4. 把 store 中的数据设置到 window.**INITIAL_STATE**属性中。
      5. 在浏览器环境中，通过 Vuex 将 window.**INITIAL_STATE**里面的数据注入到相应组件中。

4. 服务端渲染，使用 serverBundle 和 clientManifest 进行优化。
5. 一个完整的基于 Vue + VueRouter + Vuex 的 SSR 工程。

## nuxt.js 框架

[中文官方文档](https://www.nuxtjs.cn/guide)

1. Nuxt.js 预设了利用 Vue.js 开发服务端渲染的应用所需要的各种配置。
2. 下图阐述了 Nuxt.js 应用一个完整的服务器请求到渲染（或用户通过 <nuxt-link> 切换路由渲染页面）的流程：![nuxt-schema](./imgs/nuxt-schema.svg)

### 工程创建 ｜ 打包

```bash
# create project
$ npx create-nuxt-app nuxt-learn
# To get started:
cd nuxt-learn
yarn dev

# To build & start for production:
cd nuxt-learn
yarn build
yarn start
```

启动访问<http://localhost:3000/>

### 添加一个页面

这里会有一个缓存文件夹，与 egg 类似，.nuxt。查看 users/。

1. Nuxt.js 会根据 pages，自动生成的路由配置；
   1. 路由嵌套；
   2. 动态路由；
2. 页面组件实际上是 Vue 组件 pages，只不过 Nuxt.js 为这些组件添加了一些特殊的配置项（对应 Nuxt.js 提供的[功能特性](https://www.nuxtjs.cn/api#asyncdata-%E6%96%B9%E6%B3%95)）以便你能快速开发通用应用。
   1. asyncData：支持 异步数据处理；
      1. 方法会在组件（限于页面组件）**每次加载之前被调用**。它可以在服务端或路由更新之前被调用。
      2. Nuxt.js 会将 asyncData 返回的数据融合组件 data 方法返回的数据一并返回给当前组件。
      3. 由于 asyncData 方法是**在组件 初始化 前被调用的**，所以在方法内是没有办法通过 this 来引用组件的实例对象。
   2. fetch，与 asyncData 方法类似，**用于在渲染页面之前获取数据填充应用的状态树（store）**。
   3. head：配置当前页面的 Meta 标签；
   4. ayout：指定当前页面**使用的布局**（layouts 根目录下的布局文件）。
   5. validate：校验方法用于校验 动态路由的参数。
   6. middleware：指定页面的中间件，中间件会在页面渲染之前被调用
