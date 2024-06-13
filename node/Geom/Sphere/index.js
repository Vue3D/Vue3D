import Sphere from "./Sphere.vue"
import {Object3D} from "three";

const SphereName = "V3dSphere"

class SphereGeom extends Object3D {
}

const V3dSphere = Object.assign(Sphere, {
    install: function (app) {
        app.component(SphereName, Sphere);
    }
})

export {SphereName, SphereGeom, V3dSphere}
