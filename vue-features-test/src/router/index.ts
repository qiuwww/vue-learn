import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import LayoutMain from '../layout/LayoutMain.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/page',
    name: 'LayoutMain',
    component: LayoutMain,
    // 这里做子组件，就需要在父组件设置位置
    children: [
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      },
      // 功能测试页面
      {
        path: '/test/template',
        name: 'template',
        component: () => import('@/views/Template.vue')
      },
      {
        path: '/directives',
        name: 'directives',
        component: () => import('@/views/Directives/index.vue')
      },
      {
        path: '/test/computed-watch',
        name: 'computed-watch',
        component: () => import('@/views/ComputedWatch.vue')
      },
      {
        path: '/test/vuex-test',
        name: 'vuex',
        component: () => import('@/views/VuexTest.vue')
      },
      {
        path: '/test/life-cycle',
        name: 'life-cycle',
        meta: {
          // 保持不被销毁
          keepAlive: false
        },
        component: () => import('@/views/LifeCycle/Parent.vue')
      },
      {
        path: '/test/component-regist',
        name: 'component-regist',
        component: () => import('@/views/ComponentRegist/index.vue')
      },
      {
        path: '/test/communication',
        name: 'communication',
        component: () => import('@/views/Communication/Parent.vue')
      },

      // 2020-07-29
      {
        path: '/vue-instance',
        name: 'Vue 实例',
        component: () => import('@/views/VueInstance/index.vue')
      },
      {
        path: '/template-syntax',
        name: '模板语法',
        component: () => import('@/views/TemplateSyntax/index.vue')
      },
      {
        path: '/computed-watch',
        name: '计算属性和监听器',
        component: () => import('@/views/ComputedWatch/index.vue')
      },
      {
        path: '/render-list',
        name: '列表渲染',
        component: () => import('@/views/RenderList/index.vue')
      },
      {
        path: '/component-base',
        name: '组件基础',
        component: () => import('@/views/ComponentBase/index.vue')
      },
      {
        path: '/mixin',
        name: '混入的方式实现复用和组合',
        component: () => import('@/views/mixin/index.vue')
      },
      {
        path: '/Vue-Ts-Standard',
        name: '标准Vue+TS组件',
        component: () => import('@/views/Vue-Ts-Standard/index.vue')
      },
      // 测试功能点
      {
        path: '/vue-features-test-10/:id/:type',
        name: '10个Vue开发技巧助力成为更好的工程师',
        component: () => import('@/views/features-test-10/FeatureTest10.vue'),
        props: true
      }
    ]
  }
];

console.log('routes', routes);

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
