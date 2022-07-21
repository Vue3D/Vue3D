import PerspectiveCamera from "./PerspectiveCamera.vue"
import {componentsPrefix} from "../../const/config";

PerspectiveCamera.install = function (app) {
    const prefix = app.config.globalProperties?.$vue3d?.componentsPrefix ?? componentsPrefix
    app.component(`${prefix}${PerspectiveCamera.name}`, PerspectiveCamera);
};

export {PerspectiveCamera}
