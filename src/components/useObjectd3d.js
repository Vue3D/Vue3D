import {inject, markRaw, onBeforeMount, onBeforeUnmount, provide, reactive, watch} from "vue";
import {Euler, Vector3} from "../../three";

import {angle2euler} from "../utils";
import {noop} from "@unjuanable/jokes";
import useLifecycle from "./useLifecycle"
import useLayers, {layersProps} from "./useLayers"

export const object3dProps = {
    name: {type: String, default: ''},
    visible: {type: Boolean, default: true},
    position: {
        type: Object,
        default() {
            return new Vector3()
        }
    },
    rotation: {
        type: Object,
        default() {
            return new Vector3()
        },
    },
    scale: {
        type: [Number, Object],
        default() {
            return new Vector3(1, 1, 1)
        }
    },
    target: {
        type: Object
    },
    ...layersProps
}

export const object3dEmits = ['update:position', 'update:scale', 'update:rotation']

export function useObject3d(ctx) {
    const vue3d = inject('vue3d')
    const stage = inject('stage')
    const parent = inject('parent')
    // 数据节点
    const data = markRaw({
        node: null
    })

    const {process, vLoaded, vMounted, vUnmount} = useLifecycle()

    /**
     * 初始化对象节点设置
     * @param object3d
     * @param props
     */
    const init = (object3d, props) => {
        object3d.isVue3d = true
        object3d.name = props.name

        useLayers(object3d, props.layer)

        // 监听
        watch(() => props.visible, (val, oldValue) => {
            setVisible(props.visible)
        })
        watch(() => props.position, (val, oldValue) => {
            if (val === oldValue) return
            setPosition(props.position)
        }, {deep: true})
        watch(() => props.rotation, (val, oldValue) => {
            if (val === oldValue) return
            setRotation(props.rotation)
        }, {deep: true})
        watch(() => props.scale, (val, oldValue) => {
            if (val === oldValue) return
            setScale(props.scale)
        }, {deep: true})
        watch(() => props.target, (val, oldValue) => {
            setTarget(props.target)
        }, {deep: true})

        // 初始化
        data.node = object3d
        setVisible(props.visible)
        setPosition(props.position)
        setRotation(props.rotation)
        setScale(props.scale)
        setTarget(props.target)
    }

    /**
     * 在父节点上挂载
     * @param object3d
     */
    const mount = (object3d) => {
        if (parent.node) {
            parent.node?.add(object3d);
        }
        render()
    }
    /**
     * 在父节点上卸载
     * @param object3d
     */
    const unmount = (object3d) => {
        if (parent.node) {
            parent.node?.remove(object3d);
        }
        render()
    }
    /**
     * Set Position
     * @param pos
     * @param callback
     */
    const setPosition = (pos, callback = noop) => {
        if (!pos) return
        let vec3 = Object.assign(new Vector3(), pos)
        data.node.position.set(vec3.x, vec3.y, vec3.z)
        ctx.emit('update:position', pos)
        render(callback);
    }
    /**
     * Set Rotation
     * @param angle
     * @param callback
     */
    const setRotation = (angle, callback = noop) => {
        if (!angle) return
        let vec3 = Object.assign(new Vector3(), angle)
        const x = angle2euler(vec3.x);
        const y = angle2euler(vec3.y);
        const z = angle2euler(vec3.z);
        let euler = new Euler(x, y, z);
        data.node.setRotationFromEuler(euler);
        ctx.emit('update:rotation', angle)
        render(callback);
    }
    /**
     * Set Scale
     * @param scale
     * @param callback
     */
    const setScale = (scale, callback = noop) => {
        if (!scale) return
        let vec3 = new Vector3()
        if (typeof scale === 'object') {
            vec3.x = scale.hasOwnProperty('x') ? scale.x : 1
            vec3.y = scale.hasOwnProperty('y') ? scale.y : 1
            vec3.z = scale.hasOwnProperty('z') ? scale.z : 1
        } else if (typeof scale === 'number') {
            vec3.x = scale
            vec3.y = scale
            vec3.z = scale
        }
        data.node.scale.set(vec3.x, vec3.y, vec3.z)
        ctx.emit('update:scale', scale)
        render(callback);
    }
    /**
     * Set Target
     * @param target
     * @param callback
     */
    const setTarget = (target, callback = noop) => {
        if (!target) return
        let vec3 = new Vector3()
        vec3.x = target.hasOwnProperty('x') ? target.x : 0
        vec3.y = target.hasOwnProperty('y') ? target.y : 0
        vec3.z = target.hasOwnProperty('z') ? target.z : 0
        data.node.lookAt(vec3.x, vec3.y, vec3.z);
        render(callback);
    }
    /**
     * 设置是否可见
     * @param visible
     * @param callback
     */
    const setVisible = (visible, callback = noop) => {
        visible = !!visible
        data.node.visible = visible
        render(callback)
    }
    /**
     * 渲染一帧
     * @param callback
     */
    const render = (callback = noop) => {
        vue3d.render(callback, stage.id)
    }

    onBeforeMount(() => {
        if (!data.node) return
        vMounted(() => {
            mount(data.node)
            render()
        })
    })

    onBeforeUnmount(() => {
        if (!data.node) return
        vUnmount(() => {
            unmount(data.node);
            render()
        })
    })

    provide('parent', data)

    return {
        vue3d, stage, parent, process, data,
        init, mount, unmount,
        vMounted, vUnmount, vLoaded,
        setPosition, setRotation, setScale, setTarget, setVisible,
        render
    }
}
