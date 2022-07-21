import AmbientLight from "./AmbientLight.vue"
import DirectionalLight from './DirectionalLight.vue'

import {componentsPrefix} from "../../const/config";

AmbientLight.install = function (app) {
    const prefix = app.config.globalProperties?.$vue3d?.componentsPrefix ?? componentsPrefix
    app.component(`${prefix}${AmbientLight.name}`, AmbientLight);
};

DirectionalLight.install = function (app) {
    const prefix = app.config.globalProperties?.$vue3d?.componentsPrefix ?? componentsPrefix
    app.component(`${prefix}${DirectionalLight.name}`, DirectionalLight);
};

export {AmbientLight, DirectionalLight}
