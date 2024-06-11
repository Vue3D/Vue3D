import CameraOrbitControl from "./CameraOrbitControl.vue"

const CameraOrbitName = "V3dCameraOrbit"
const V3dCameraOrbitControl = Object.assign(CameraOrbitControl, {
    install: function (app) {
        app.component(CameraOrbitName, CameraOrbitControl);
    }
})

export {V3dCameraOrbitControl, CameraOrbitName}
