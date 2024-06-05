import PerspectiveCamera from "./PerspectiveCamera.vue"

const V3dPerspectiveCamera = Object.assign(PerspectiveCamera, {
    install: function (app) {
        app.component("V3dPerspectiveCamera", PerspectiveCamera);
    }
})

export {V3dPerspectiveCamera}
