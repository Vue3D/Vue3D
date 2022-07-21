import Scene from "./Scene.vue"
import {componentsPrefix} from "../../const/config";

Scene.install = function (app) {
    const prefix = app.config.globalProperties?.$vue3d?.componentsPrefix ?? componentsPrefix
    app.component(`${prefix}${Scene.name}`, Scene);
};

export default Scene
