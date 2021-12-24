import { createRouter, createWebHashHistory } from 'vue-router';

const home = () => import('../pages/Home.vue');
const login = () => import('../pages/Login.vue');
const CompositionTest = () => import('../pages/CompositionTest.vue');

const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        name: 'home',
        component: home,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/CompositionTest',
        name: 'CompositionTest',
        component: CompositionTest,
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});
