import Vue3DHandler from "./core"
import Vue3DStage from './components/Stage'
import * as V3dComponents from './components'
import {componentsPrefix, globalImport, mainComponentName} from "./const/config"
import {markRaw} from "vue";

const defaultOptions = {
    globalImport,
    componentsPrefix, // 组件前缀
    mainComponentName
}

export default {
    install(app, customOptions = {}) {
        // 获取配置文件
        const options = Object.assign({}, defaultOptions, customOptions)
        const vue3d = new Vue3DHandler(options)
        // 全局注入
        app.config.globalProperties['$vue3d'] = vue3d
        // 组件注入
        app.provide('$vue3d', markRaw(vue3d))
        // 全局注册组件
        app.component(options.mainComponentName ?? Vue3DStage.name, Vue3DStage)
        if (options.globalImport) {
            for (let key in V3dComponents) {
                app.component(options.componentsPrefix + V3dComponents[key].name, V3dComponents[key])
            }
        }
    }
}

export * from "./components/"
export {ev} from "./const/event"
export * from "./const/materials";


