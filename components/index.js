import Scene from './Scene'
import Camera from './Camera'

// 需要全局注入的组件
const components = [
    {name: 'Scene', component: Scene},
    {name: 'Camera', component: Camera},
]

function InstallComponents(app, prefix = 'V3d') {
    components.forEach((com) => {
        app.component(`${prefix}${com.name}`, com.component);
    });
}

export {
    Scene, Camera, InstallComponents
}