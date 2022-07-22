import ObjLoader from './ObjLoader.vue'

import {componentsPrefix} from "../../const/config";

ObjLoader.install = function (app) {
    const prefix = app.config.globalProperties?.$vue3d?.componentsPrefix ?? componentsPrefix
    app.component(`${prefix}${ObjLoader.name}`, ObjLoader);
};

export {ObjLoader}
