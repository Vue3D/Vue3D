import ThreeViewCamera from "./ThreeViewCamera.vue"

const ComponentName = "V3dThreeViewCamera"

const V3dThreeViewCamera = Object.assign(ThreeViewCamera, {
    install: function (app) {
        app.component(ComponentName, ThreeViewCamera);
    }
})

export {V3dThreeViewCamera, ComponentName}
