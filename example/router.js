import {createRouter, createWebHashHistory} from 'vue-router'

export const routes = [
    {
        path: '/',
        component: () => import('./views/Base.vue'),
        name: 'base',
        meta: {label: "基础组件测试"}
    },
    {
        path: '/lathe',
        component: () => import('./views/TLathe.vue'),
        name: 'lathe',
        meta: {label: "划线建模"}
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router

