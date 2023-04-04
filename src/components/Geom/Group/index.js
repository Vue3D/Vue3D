import _Group from "./Group.vue"
import {getPrefixComponent} from "@vue3d/const/config";

const Group = Object.assign(_Group, {
    install(app) {
        app.component(getPrefixComponent(_Group.name), _Group)
    }
})

export default Group
