import PerspectiveCamera from "./PerspectiveCamera.vue"

const PerspectiveCameraName = "V3dPerspectiveCamera"
const V3dPerspectiveCamera = Object.assign(PerspectiveCamera, {
    install: function (app) {
        app.component(PerspectiveCameraName, PerspectiveCamera);
    }
})

export {V3dPerspectiveCamera, PerspectiveCameraName}
