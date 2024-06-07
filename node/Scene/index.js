import Scene from "./Scene.vue"

const SceneName = "V3dScene"
const V3dScene = Object.assign(Scene, {
    install: function (app) {
        app.component(SceneName, Scene);
    }
})

export {V3dScene, SceneName}
