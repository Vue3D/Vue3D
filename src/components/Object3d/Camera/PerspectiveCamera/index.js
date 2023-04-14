import _PerspectiveCamera from "./PerspectiveCamera.vue"
import {getPrefixComponent} from "../../../../const/config";

const PerspectiveCamera = Object.assign(_PerspectiveCamera, {
    install: function (app) {
        app.component(getPrefixComponent(_PerspectiveCamera.name), _PerspectiveCamera);
    }
})

export default PerspectiveCamera
