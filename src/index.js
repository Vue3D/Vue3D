import * as THREE from "three"
import Vue3DHandler from "./core"
import Vue3DComponent from './core/Vue3D.vue'
import {componentsPrefix} from "./const/config"
import {PerspectiveCamera} from "./components/Camera"
import {Cube, Sphere} from './components/Geom'
import {AmbientLight, DirectionalLight} from "./components/Light"
import {ObjLoader} from "./components/Loader"

const defaultOptions = {
    componentsPrefix, // 组件前缀
}

export default {
    install(app, customOptions = {}) {
        // 获取配置文件
        const options = Object.assign({}, defaultOptions, customOptions)
        const vue3d = new Vue3DHandler(options)
        // 全局注入
        app.config.globalProperties.$vue3d = vue3d
        // 组件注入
        app.provide('vue3d', vue3d)
        // 全局注册组件
        app.component(Vue3DComponent.name, Vue3DComponent)
    }
}

export {
    THREE,
    PerspectiveCamera,
    Cube, Sphere,
    AmbientLight, DirectionalLight,
    ObjLoader
}


