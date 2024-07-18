import {Scene} from "three";
import {nanoid} from "nanoid";
import {computed, inject, markRaw, onBeforeMount, onBeforeUnmount, onMounted, onUpdated, provide} from "vue";
import {lifecycleEmits, lifecycleProps, pluginEmits, pluginProps, useLifecycle, usePlugin} from "../use";
import {Node, SceneNode, StageNode} from "../libs/Node.Class"
import {SceneName, StageName} from "../node";

const nodeEmits = [
    ...lifecycleEmits,
    ...pluginEmits
]
const nodeProps = {
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
function useNode(obj3, props, emits, componentName = "V3dComponent") {
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
function useMNode(obj3, props, emits, componentName = "V3dComponent") {
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
 * @returns
 */
function useStageNode(obj3 = new Scene(), props, emits) {
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

    // 这里 node === node.stage
    return {status, node, stage: node.stage}
}

/**
 * 创建场景节点
 * @param scene
 * @param props
 * @param emits
 * @returns
 */
function useSceneNode(scene = new Scene(), props, emits) {
    const {status} = useLifecycle(scene, props, emits);
    const {} = usePlugin(scene, props, emits);

    const node = markRaw(new SceneNode(scene, props.uuid, SceneName))

    provide("parent", node)

    return {status, node, scene}
}


export {nodeEmits, nodeProps, useNode, useMNode, useStageNode, useSceneNode}
