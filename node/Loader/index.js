import Loader from "./Loader.vue"
import {LoadingManager} from "three";

const LoaderName = "V3dLoader"
const V3dLoader = Object.assign(Loader, {
    install: function (app) {
        app.component(LoaderName, Loader);
    }
})


const FormatWhitelist = ["OBJ"]

export {V3dLoader, LoaderName, FormatWhitelist}

/** OBJLoader **/
export {V3dObjLoader, ObjLoaderName} from "./ObjLoader";

export {V3dErrLoaded, ErrLoadedName} from "./ErrLoaded"
