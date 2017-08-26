

import App from '../App'

// 数组保存不同类型的路由匹配。
export default [{
    path: '/',
    component: App,
    // children 配置就是像 routes 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。
    // 路由嵌套
    children: [{
        path: '',
        // 匹配到页面home，vue模板
        component: r => require.ensure([], () => r(require('../page/home')), 'home')
    }, {
        path: '/item',
        component: r => require.ensure([], () => r(require('../page/item')), 'item')
    }, {
        path: '/score',
        component: r => require.ensure([], () => r(require('../page/score')), 'score')
    }]
}]

// 参数
// 

// require.ensure
// http://www.css88.com/doc/webpack2/guides/code-splitting-require/
// require.ensure(dependencies: String[], callback: function(require), chunkName: String)
// 
// webpack 在编译时，会静态地解析代码中的 require.ensure()，
// 同时将模块添加到一个分开的 chunk 当中。
// 这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
// 
// shim ： 垫片