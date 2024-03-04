import {Object3D} from "three";
import Cube from "./Cube.vue"

const ComponentName = "V3dCube"

class CubeGeom extends Object3D {
}

const V3dCube = Object.assign(Cube, {
    install: function (app) {
        app.component(ComponentName, Cube);
    }
})
export {ComponentName, V3dCube, CubeGeom}
