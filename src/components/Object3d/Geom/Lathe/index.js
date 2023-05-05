import _Lathe from "./Lathe.vue"
import {getPrefixComponent} from "../../../../const/config";

const Lathe = Object.assign(_Lathe, {
    install: function (app) {
        app.component(getPrefixComponent(Lathe.name), _Lathe);
    }
})
export default Lathe
