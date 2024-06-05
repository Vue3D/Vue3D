import _ObjLoader from './ObjLoader.vue'

import {getPrefixComponent} from "../../../../const/config";

const ObjLoader = Object.assign(_ObjLoader, {
    install: function (app) {
        app.component(getPrefixComponent(_ObjLoader.name), _ObjLoader);
    }
})

export default ObjLoader
