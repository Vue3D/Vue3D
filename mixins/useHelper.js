import {inject, markRaw, provide} from "vue";
import {Helper} from "../libs/Helper.class";

export function useHelper(helper, props, emits, componentName = "V3dHelper") {
    const stage = inject("stage")
    const parent = inject("parent")

    const node = markRaw(new Helper(helper, props.uuid, componentName))

    const mount = () => {
        if (!parent) return
        node.parent = parent
        node.mount()
        stage.render()
    }

    const unmount = () => {
        if (!parent) return
        node.unmount()
        stage.render()
    }


    provide("parent", node)

    return {node, helper, mount, unmount}
}
