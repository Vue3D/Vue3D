import Scene from "./Scene.vue"

const V3dScene = Object.assign(Scene, {
    install: function (app) {
        app.component("V3dScene", Scene);
    }
})

export {V3dScene}
