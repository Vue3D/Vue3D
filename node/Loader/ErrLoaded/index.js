import ErrLoaded from "./ErrLoaded.vue"
import {Object3D} from "three";

const ErrLoadedName = "V3dErrLoaded"
const V3dErrLoaded = Object.assign(ErrLoaded, {
    install: function (app) {
        app.component(ErrLoadedName, ErrLoaded);
    }
})

class ErrorObject3D extends Object3D {
}

export {V3dErrLoaded, ErrLoadedName, ErrorObject3D}
