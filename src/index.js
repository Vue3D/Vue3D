import Vue3DHandler from "./core"
import Vue3DComponent from './core/Vue3D.vue'
import {classHandler, componentsPrefix, mainComponentName} from "./const/config"

const defaultOptions = {
    componentsPrefix, // 组件前缀
    classHandler,
    mainComponentName
}

export default {
    install(app, customOptions = {}) {
        // 获取配置文件
        const options = Object.assign({}, defaultOptions, customOptions)
        const vue3d = new Vue3DHandler(options)
        // 全局注入
        app.config.globalProperties['$' + options.classHandler] = vue3d
        // 组件注入
        app.provide(options.classHandler, vue3d)
        // 全局注册组件
        app.component(options.mainComponentName ?? Vue3DComponent.name, Vue3DComponent)
    }
}

export * from "./components/"
export {ev} from "./const/event"
export * from "./const/materials";


