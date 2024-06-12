import CameraTransformControl from "./CameraTransformControl.vue"

const TransformControlName = "V3dCameraTransformControl"
const V3dCameraTransformControl = Object.assign(CameraTransformControl, {
    install: function (app) {
        app.component(TransformControlName, CameraTransformControl);
    }
})

export {V3dCameraTransformControl, TransformControlName}
