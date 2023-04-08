import _BoxHelper from "./BoxHelper.vue"
import {getPrefixComponent} from "../../../../const/config";

const BoxHelper = Object.assign(_BoxHelper, {
    install: function (app) {
        app.component(getPrefixComponent(_BoxHelper.name), _BoxHelper);
    }
})

export default BoxHelper
