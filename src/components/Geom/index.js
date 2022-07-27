import Cube from "./Cube.vue"
import Sphere from "./Sphere.vue"
import {componentsPrefix} from "../../const/config";

Cube.install = function (app) {
    const prefix = app.config.globalProperties?.$vue3d?.componentsPrefix ?? componentsPrefix
    app.component(`${prefix}${Cube.name}`, Cube);
};

Sphere.install = function (app) {
    const prefix = app.config.globalProperties?.$vue3d?.componentsPrefix ?? componentsPrefix
    app.component(`${prefix}${Sphere.name}`, Sphere);
};

export {Cube, Sphere}
