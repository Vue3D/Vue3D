import {computed, inject, markRaw, onBeforeMount, onBeforeUnmount, onMounted, onUpdated, provide} from "vue";
import {Scene} from "three";
import {nanoid} from "nanoid";

import {lifecycleEmits, lifecycleProps, useLifecycle} from "../use/useLifecycle";
import {pluginEmits, pluginProps, usePlugin} from "../use/usePlugin";
import {Node, SceneNode, StageNode} from "../libs/Node.Class"

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
        node.setParent(parent).add().mount()
    })

    onBeforeUnmount(() => {
        node.remove().unmount()
    })

    onMounted(() => {
        stage.render()
    })

    onUpdated(() => {
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

    onBeforeMount(() => {
        node.setParent(parent).mount()
        stage.render()
    })

    onBeforeUnmount(() => {
        node.unmount()
        stage.render()
    })

    provide("parent", node)

    return {
        status, parent, node
    }
}

/**
 * 创建 Stage节点
 * @param obj3 三维对象
 * @param props 参数
 * @param emits 事件
 * @param componentName
 * @returns
 */
export function useStageNode(obj3 = new Scene(), props, emits, componentName = "V3dStage") {
    const {status} = useLifecycle(obj3, props, emits);
    const {} = usePlugin(obj3, props, emits);

    const node = markRaw(new StageNode(obj3, props.uuid, componentName))

    node.width = computed(() => {
        return props.width
    })
    node.height = computed(() => {
        return props.height
    })

    provide("parent", node)

    // 这里 node === node.stage
    return {status, node, stage: node.stage}
}

/**
 * 创建场景节点
 * @param scene
 * @param props
 * @param emits
 * @param componentName
 * @returns
 */
export function useSceneNode(scene = new Scene(), props, emits, componentName = "V3dScene") {
    const {status} = useLifecycle(scene, props, emits);
    const {} = usePlugin(scene, props, emits);

    const node = markRaw(new SceneNode(scene, props.uuid, componentName))

    provide("parent", node)

    return {status, node, scene}
}



