export const ComponentName = "V3dScene"

import Scene from "./Scene.vue"

const V3dScene = Object.assign(Scene, {
    install: function (app) {
        app.component(ComponentName, Scene);
    }
})

export {V3dScene}
