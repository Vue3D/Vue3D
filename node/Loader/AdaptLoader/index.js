import AdaptLoader from "./AdaptLoader.vue"

const AdaptLoaderName = "V3dAdaptLoader"
const V3dAdaptLoader = Object.assign(AdaptLoader, {
    install: function (app) {
        app.component(AdaptLoaderName, AdaptLoader);
    }
})

const FormatWhitelist = ["OBJ"]
export {V3dAdaptLoader, AdaptLoaderName, FormatWhitelist}

/** OBJLoader **/
export {V3dObjLoader, ObjLoaderName} from "../ObjLoader";

export {V3dErrLoaded, ErrLoadedName} from "../ErrLoaded"
