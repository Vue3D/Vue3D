import Sphere from "./Sphere.vue"
import {Object3D} from "three";

const ComponentName = "V3dSphere"

class SphereGeom extends Object3D {
}

const V3dSphere = Object.assign(Sphere, {
    install: function (app) {
        app.component(ComponentName, Sphere);
    }
})

export {ComponentName, SphereGeom, V3dSphere}
