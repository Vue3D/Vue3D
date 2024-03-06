import Lathe from "./Lathe.vue"
import {Object3D} from "three";

const ComponentName = "V3dLathe"

class LatheGeom extends Object3D {
}

const V3dLathe = Object.assign(Lathe, {
    install: function (app) {
        app.component(ComponentName, Lathe);
    }
})

export {V3dLathe, ComponentName, LatheGeom}
