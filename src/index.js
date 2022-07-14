import * as Three from "three";
import Vue3D from "./core"
import {InstallComponents} from "./components";

const defaultOptions = {
    componentsPrefix: 'V3d', // 组件前缀
}

export default {
    install(app, customOptions = {}) {
        // 获取配置文件
        const options = Object.assign({}, defaultOptions, customOptions)
        const vue3d = new Vue3D(options)
        // 全局注入
        app.config.globalProperties.$vue3d = vue3d
        // 组件注入
        app.provide('vue3d', vue3d)
        // 全局注册组件
        InstallComponents(app, options.componentsPrefix)
    }
}

export {Three}