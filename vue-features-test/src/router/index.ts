import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import LayoutMain from '../layout/LayoutMain.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
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
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      },
      // 功能测试页面
      {
        path: '/test/template',
        name: 'template',
        component: () => import('@/views/Template.vue'),
      },
      {
        path: '/test/directives',
        name: 'directives',
        component: () => import('@/views/Directives.vue'),
      },
      {
        path: '/test/computed-watch',
        name: 'computed-watch',
        component: () => import('@/views/ComputedWatch.vue'),
      },
      {
        path: '/test/vuex-test',
        name: 'vuex',
        component: () => import('@/views/VuexTest.vue'),
      },
      {
        path: '/test/life-cycle',
        name: 'life-cycle',
        meta: {
          // 保持不被销毁
          keepAlive: false,
        },
        component: () => import('@/views/LifeCycle/Parent.vue'),
      },
      {
        path: '/test/component-regist',
        name: 'component-regist',
        component: () => import('@/views/ComponentRegist/index.vue'),
      },
      {
        path: '/test/communication',
        name: 'communication',
        component: () => import('@/views/Communication/Parent.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

export default router;
