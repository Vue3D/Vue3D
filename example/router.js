import {createRouter, createWebHashHistory} from 'vue-router'

export const routes = [
    {
        path: '/',
        component: () => import('./views/Base.vue'),
        name: 'base',
        meta: {label: "基础组件测试"}
    },
    {
        path: '/array_camera',
        component: () => import('./views/ArrayCamera.vue'),
        name: 'array_camera',
        meta: {label: "多摄像机"}
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router

