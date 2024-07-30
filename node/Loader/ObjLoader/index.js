import ObjLoader from "./ObjLoader.vue"

const ObjLoaderName = "V3dObjLoader"
const V3dObjLoader = Object.assign(ObjLoader, {
    install: function (app) {
        app.component(ObjLoaderName, ObjLoader);
    }
})

export {V3dObjLoader, ObjLoaderName}
