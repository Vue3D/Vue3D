import Vue3DHandler from "./stage"
import Vue3DComponent from './stage/Vue3D.vue'
import {componentsPrefix, mainComponentName} from "./const/config"
import {markRaw} from "vue";

const defaultOptions = {
    componentsPrefix, // 组件前缀
    mainComponentName
}

export default {
    install(app, customOptions = {}) {
        // 获取配置文件
        const options = Object.assign({}, defaultOptions, customOptions)
        const vue3d = new Vue3DHandler(options)
        // 全局注入
        app.config.globalProperties['$v3d'] = vue3d
        // 组件注入
        app.provide('v3d', markRaw(vue3d))
        // 全局注册组件
        app.component(options.mainComponentName ?? Vue3DComponent.name, Vue3DComponent)
    }
}

export * from "./components/"
export {ev} from "./const/event"
export * from "./const/materials";


