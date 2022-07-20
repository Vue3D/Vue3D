import Scene from './Scene'
import Camera from './Camera'
import {componentsPrefix} from "../const/config";

// 需要全局注入的组件
const components = [
    {name: 'Scene', component: Scene},
    {name: 'Camera', component: Camera},
]

function InstallComponents(app) {
    const prefix = app.config.globalProperties?.$vue3d?.componentsPrefix ?? componentsPrefix
    components.forEach((com) => {
        app.component(`${prefix}${com.name}`, com.component);
    });
}

export {
    Scene, Camera, InstallComponents
}