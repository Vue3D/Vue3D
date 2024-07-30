import {defineAsyncComponent} from "vue";
import {Object3D} from "three";
import Cube from "./Cube.vue"

class CubeGeom extends Object3D {
}

const CubeName = "V3dCube"
const V3dCube = Object.assign(Cube, {
    install: function (app) {
        app.component(CubeName, Cube);
    }
})

export {V3dCube, CubeName, CubeGeom}
