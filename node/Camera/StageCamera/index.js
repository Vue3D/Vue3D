import StageCamera from "./StageCamera.vue";

const ComponentName = "V3dStageCamera"

const V3dStageCamera = Object.assign(StageCamera, {
    install: function (app) {
        app.component(ComponentName, StageCamera);
    }
})

export {ComponentName, V3dStageCamera}
