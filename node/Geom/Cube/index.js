import Cube from "./Cube.vue"
import {Object3D} from "three";

const CubeName = "V3dCube"
const V3dCube = Object.assign(Cube, {
    install: function (app) {
        app.component(CubeName, Cube);
    }
})

class CubeGeom extends Object3D {
}

export {V3dCube, CubeName, CubeGeom}
