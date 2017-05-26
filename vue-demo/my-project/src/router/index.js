import Vue from 'vue'
import Router from 'vue-router'
// 这里的@是自定义的路径   '@': resolve('src')   =   ../
import Hello from '@/components/Hello'

Vue.use(Router)
// 页面路由，解析模板
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})
