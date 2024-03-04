import {inject, onBeforeMount, onBeforeUnmount, provide, toRaw, watch} from "vue";
import {lifecycleEmits, lifecycleProps, useLifecycle} from "../useLifecycle";

export function useObject3d(object3d, props, emits, v3dComponentName = "V3dComponents") {
    const stage = inject('stage')
    const parent = inject('parent')

    const {status} = useLifecycle(object3d, props, emits)

    /**
     * 设置图层
     * @param layer
     */
    const setLayer = (layer) => {
        object3d.layers.disableAll()
        if (!layer) {
            object3d.layers.enableAll()
            return
        }
        if (Array.isArray(layer)) {
            for (let i of layer) {
                object3d.layers.enable(i)
            }
        } else {
            object3d.layers.enable(layer)
        }
    }

    /**
     * 设置子对象图层
     */
    const setChildLayer = () => {
        object3d.children.forEach(child => {
            child.layers.disableAll()
            if (!props.layer) {
                child.layers.enableAll()
                return
            }
            if (Array.isArray(props.layer)) {
                for (let i of props.layer) {
                    child.layers.enable(i)
                }
            } else {
                child.layers.enable(props.layer)
            }
        })
    }

    /**
     * 设置是否可见
     * @param visible
     */
    const setVisible = (visible) => {
        visible = !!visible
        object3d.visible = visible
        stage.render()
    }

    /**
     * 在父节点上挂载
     * @param object3d
     */
    const mount = (object3d) => {
        if (parent.node) {
            parent.node?.add(toRaw(object3d));
        }
        stage.render()
    }

    /**
     * 在父节点上卸载
     * @param object3d
     */
    const unmount = (object3d) => {
        if (parent.node) {
            parent.node?.remove(toRaw(object3d));
        }
        stage.render()
    }

    /**
     * 初始化对象节点设置
     * @param object3d
     * @param props
     */
    object3d.isVue3d ??= true
    object3d.name = props.name

    const node = parent.add(toRaw(object3d), v3dComponentName, props.uuid)
    provide("parent", node)

    onBeforeMount(() => {
        if (!object3d) return
        mount(object3d)
    })

    onBeforeUnmount(() => {
        if (!object3d) return
        unmount(object3d)
    })

    watch(() => props.visible, (val) => {
        setVisible(val)
    }, {immediate: true})
    watch(() => props.layer, (val) => {
        setLayer(val)
    }, {immediate: true})

    return {
        status,
        mount, unmount,
        setVisible,
        setLayer,
        setChildLayer
    }
}

export const object3dEmits = [...lifecycleEmits]
export const object3dProps = {
    ...lifecycleProps,
    name: {type: String, default: ''},
    visible: {type: Boolean, default: true},
    layer: {
        type: [Number, Array], validator(value) {
            if (Array.isArray(value)) {
                for (let item of value) {
                    if (!test(item)) return false
                }
                return true
            } else {
                return test(value)
            }

            function test(val) {
                return val >= 0 || val < 32
            }
        }
    },
}
