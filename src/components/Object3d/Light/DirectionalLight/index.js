import _DirectionalLight from './DirectionalLight.vue'

import {getPrefixComponent} from "../../../../const/config";

const DirectionalLight = Object.assign(_DirectionalLight, {
    install: function (app) {
        app.component(getPrefixComponent(_DirectionalLight.name), _DirectionalLight);
    }
})

export default DirectionalLight
