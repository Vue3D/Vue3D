import _Cube from "./Cube.vue"
import {getPrefixComponent} from "../../../../const/config";

const Cube = Object.assign(_Cube, {
    install: function (app) {
        app.component(getPrefixComponent(_Cube.name), _Cube);
    }
})
export default Cube
