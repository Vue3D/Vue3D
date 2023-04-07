import _Scene from "./Scene.vue"
import {getPrefixComponent} from "../../const/config";

const Scene = Object.assign(_Scene, {
    install: function (app) {
        app.component(getPrefixComponent(_Scene.name), _Scene);
    }
})

export default Scene
