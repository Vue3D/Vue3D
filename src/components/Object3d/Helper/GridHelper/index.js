import _GridHelper from "./GridHelper.vue"
import {getPrefixComponent} from "../../../../const/config";

const GridHelper = Object.assign(_GridHelper, {
    install: function (app) {
        app.component(getPrefixComponent(_GridHelper.name), _GridHelper);
    }
})

export default GridHelper
