import Cube from "./Cube.vue"
import {componentsPrefix} from "../../const/config";

Cube.install = function (app) {
    const prefix = app.config.globalProperties?.$vue3d?.componentsPrefix ?? componentsPrefix
    app.component(`${prefix}${Cube.name}`, Cube);
};

export {Cube}
