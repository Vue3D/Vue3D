import _Stage from "./Stage.vue"
import {getPrefixComponent} from "../../const/config";

const Stage = Object.assign(_Stage, {
    install: function (app) {
        app.component(getPrefixComponent(_Stage.name), _Stage);
    }
})

export default Stage
