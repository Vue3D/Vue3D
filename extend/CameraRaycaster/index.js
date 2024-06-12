import CameraRaycaster from "./CameraRaycaster.vue"

const RaycasterName = "V3dCameraRaycaster"
const V3dCameraRaycaster = Object.assign(CameraRaycaster, {
    install: function (app) {
        app.component(RaycasterName, CameraRaycaster);
    }
})

export {V3dCameraRaycaster, RaycasterName}
