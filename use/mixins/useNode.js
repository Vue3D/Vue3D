import {lifecycleEmits, lifecycleProps, useLifecycle} from "../useLifecycle";
import {pluginEmits, pluginProps, usePlugin} from "../usePlugin";
import {nanoid} from "nanoid";
import {computed, inject, markRaw, onBeforeMount, onBeforeUnmount, toRaw} from "vue";
import {Scene} from "three";
import {StageNode} from "../../libs/Node.Class"
import {StageName} from "../../node";

export function useNode(node, props, emits) {
    const {status} = useLifecycle(node, props, emits);
    const {} = usePlugin(node, props, emits);

    const stage = inject("stage")
    console.log(stage)
    const parent = inject("parent")

    onBeforeMount(() => {
        if (!node) return
        mount(node)
    })

    onBeforeUnmount(() => {
        if (!node) return
        unmount(node)
    })

    /**
     * 在父节点上挂载
     * @param child
     */
    const mount = (child) => {
        if (parent?.node) {
            parent.node?.add(toRaw(child));
        }
        stage.render()
    }

    /**
     * 在父节点上卸载
     * @param child
     */
    const unmount = (child) => {
        if (parent.node) {
            parent.node?.remove(toRaw(child));
        }
        stage.render()
    }

    return {
        status
    }
}

/**
 * 创建Stage节点
 * @param obj3 三维对象
 * @param props 参数
 * @param emits 事件
 * @returns
 */
export function useStageNode(obj3 = new Scene(), props, emits) {
    const {status} = useLifecycle(obj3, props, emits);
    const {} = usePlugin(obj3, props, emits);

    const node = markRaw(new StageNode(obj3, props.uuid, StageName))

    node.width = computed(() => {
        return props.width
    })
    node.height = computed(() => {
        return props.height
    })

    return {status, node}
}

export function useSceneNode(obj3 = new Scene(), props, emits) {

}

export const nodeEmits = [
    ...lifecycleEmits,
    ...pluginEmits
]
export const nodeProps = {
    ...lifecycleProps,
    ...pluginProps,
    uuid: {
        type: [String, Number], default() {
            return nanoid(8)
        }
    },
}
