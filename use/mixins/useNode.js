import {lifecycleEmits, lifecycleProps, useLifecycle} from "../useLifecycle";
import {pluginEmits, pluginProps, usePlugin} from "../usePlugin";
import {nanoid} from "nanoid";
import {computed, inject, markRaw, onBeforeMount, onBeforeUnmount, provide} from "vue";
import {Scene} from "three";
import {Node, SceneNode, StageNode} from "../../libs/Node.Class"
import {SceneName, StageName} from "../../node";

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

/**
 * 创建节点（自动挂载）
 * @param obj3
 * @param props
 * @param emits
 * @param componentName
 * @returns
 */
export function useNode(obj3, props, emits, componentName = "V3dComponent") {
    const {status} = useLifecycle(obj3, props, emits);
    const {} = usePlugin(obj3, props, emits);

    const stage = inject("stage")
    const parent = inject("parent")

    const node = markRaw(new Node(obj3, props.uuid, componentName))

    onBeforeMount(() => {
        if (!parent) return
        node.parent = parent
        node.mount()
        stage.render()
    })

    onBeforeUnmount(() => {
        if (!parent) return
        node.unmount()
        stage.render()
    })

    provide("parent", node)

    return {
        status, parent, node
    }
}

/**
 * 创建节点（手动挂载）
 * @param obj3
 * @param props
 * @param emits
 * @param componentName
 * @returns
 */
export function useMNode(obj3, props, emits, componentName = "V3dComponent") {
    const {status} = useLifecycle(obj3, props, emits);
    const {} = usePlugin(obj3, props, emits);

    const stage = inject("stage")
    const parent = inject("parent")

    const node = markRaw(new Node(obj3, props.uuid, componentName))

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

    return {
        status, parent, node, mount, unmount
    }
}

/**
 * 创建 Stage节点
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

    provide("parent", node)

    return {status, node, stage: node.stage}
}

/**
 * 创建场景节点
 * @param scene
 * @param props
 * @param emits
 * @returns
 */
export function useSceneNode(scene = new Scene(), props, emits) {
    const {status} = useLifecycle(scene, props, emits);
    const {} = usePlugin(scene, props, emits);

    const node = markRaw(new SceneNode(scene, props.uuid, SceneName))

    provide("parent", node)

    return {status, node, scene}
}



