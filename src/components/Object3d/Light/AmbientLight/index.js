import _AmbientLight from "./AmbientLight.vue"
import {getPrefixComponent} from "../../../../const/config";

const AmbientLight = Object.assign(_AmbientLight, {
    install: function (app) {
        app.component(getPrefixComponent(_AmbientLight.name), _AmbientLight);
    }
})

export default AmbientLight
