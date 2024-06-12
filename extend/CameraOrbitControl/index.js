import CameraOrbitControl from "./CameraOrbitControl.vue"

const OrbitControlName = "V3dCameraOrbitControl"
const V3dCameraOrbitControl = Object.assign(CameraOrbitControl, {
    install: function (app) {
        app.component(OrbitControlName, CameraOrbitControl);
    }
})

export {V3dCameraOrbitControl, OrbitControlName}
