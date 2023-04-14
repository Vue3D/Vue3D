import _Sphere from "./Sphere.vue"
import {getPrefixComponent} from "../../../../const/config";

const Sphere = Object.assign(_Sphere, {
    install: function (app) {
        app.component(getPrefixComponent(_Sphere.name), _Sphere);
    }
})

export default Sphere
