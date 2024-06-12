import {inject, markRaw, onBeforeMount, onBeforeUnmount, onMounted, onUpdated} from "vue";
import {ExtendNode} from "../libs/Node.Class";
import {nanoid} from "nanoid";

export const extendProps = {
    uuid: {
        type: [String, Number], default() {
            return nanoid(8)
        }
    },
}

export const extendEmits = []

export function useExtend(extObj, props, emits, componentName = "V3dHelper") {
    const stage = inject("stage")
    const parent = inject("parent")

    const extend = markRaw(new ExtendNode(extObj, props.uuid, componentName))

    onBeforeMount(() => {
        extend.setParent(parent).mount()
    })

    onBeforeUnmount(() => {
        extend.unmount()
    })

    onMounted(() => {
        stage.render()
    })

    onUpdated(() => {
        stage.render()
    })

    return {extend}
}
