import {inject, markRaw, provide, reactive, onBeforeMount, onBeforeUnmount, watch} from "vue";
import {Euler, Vector3} from "three";

import {ev} from "../const/event";
import {angle2euler} from "../utils";

export const object3dProps = {
    name: {type: String, default: ''},
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
        }
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
    visible: {type: Boolean, default: true}
}

export const object3dEmits = ['update:position', 'update:scale', 'update:rotation']

export function useObject3d(ctx) {
    const vue3d = inject('vue3d')
    const handler = inject('handler')
    const parent = inject('parent')
    const process = reactive({
        mounted: false, // 挂载完成
        loaded: false, // 加载完成
    })

    // 数据节点
    const data = markRaw({
        node: null
    })

    /**
     * 初始化对象节点设置
     * @param object3d
     * @param props
     */
    const init = (object3d, props) => {
        data.node = object3d
        setPosition(props.position)
        setRotation(props.rotation)
        setScale(props.scale)
        setTarget(props.target)
        setVisible(props.visible)

        watch(() => props.position, () => {
            setPosition(props.position)
        }, {deep: true})

        watch(() => props.rotation, () => {
            setRotation(props.rotation)
        }, {deep: true})

        watch(() => props.scale, () => {
            setScale(props.scale)
        }, {deep: true})

        watch(() => props.target, () => {
            setTarget(props.target)
        }, {deep: true})

        watch(() => props.visible, () => {
            setVisible(props.visible)
        })
    }

    /**
     * 在父节点上挂载
     * @param object3d
     */
    const mount = (object3d) => {
        if (parent.node) {
            parent.node?.add(object3d);
        }
    }
    /**
     * 在父节点上卸载
     * @param object3d
     */
    const unmount = (object3d) => {
        if (parent.node) {
            parent.node?.remove(object3d);
        }
    }
    /**
     * Set Position
     * @param vec3
     * @param callback
     */
    const setPosition = (vec3, callback = null) => {
        if (vec3 && vec3.hasOwnProperty('x') && vec3.hasOwnProperty('y') && vec3.hasOwnProperty('z')) {
            vec3 = new Vector3(vec3.x, vec3.y, vec3.z)
            data.node.position.set(vec3.x, vec3.y, vec3.z)
            render();
            ctx.emit('update:position', vec3)
        }
        if (callback && typeof callback === 'function')
            callback()
    }
    /**
     * Set Rotation
     * @param vec3
     * @param callback
     */
    const setRotation = (vec3, callback = null) => {
        if (vec3 && vec3.hasOwnProperty('x') && vec3.hasOwnProperty('y') && vec3.hasOwnProperty('z')) {
            vec3 = new Vector3(vec3.x, vec3.y, vec3.z)
            const x = angle2euler(vec3.x);
            const y = angle2euler(vec3.y);
            const z = angle2euler(vec3.z);
            let euler = new Euler(x, y, z);
            data.node.setRotationFromEuler(euler);
            render();
            ctx.emit('update:rotation', vec3)
        }
        if (callback && typeof callback === 'function')
            callback()
    }
    /**
     * Set Scale
     * @param vec3
     * @param callback
     */
    const setScale = (vec3, callback = null) => {
        if (typeof vec3 === 'object' && vec3.hasOwnProperty('x') && vec3.hasOwnProperty('y') && vec3.hasOwnProperty('z')) {
            vec3 = new Vector3(vec3.x, vec3.y, vec3.z)
            data.node.scale.set(vec3.x, vec3.y, vec3.z)
            render();
        } else if (typeof vec3 === 'number' && vec3 !== 0) {
            vec3 = new Vector3(vec3, vec3, vec3)
            data.node.scale.set(vec3.x, vec3.y, vec3.z)
            render();
            ctx.emit('update:scale', vec3)
        }
        if (callback && typeof callback === 'function')
            callback()
    }
    /**
     * Set Target
     * @param vec3
     * @param callback
     */
    const setTarget = (vec3, callback = null) => {
        if (vec3 && vec3.hasOwnProperty('x') && vec3.hasOwnProperty('y') && vec3.hasOwnProperty('z')) {
            data.node.lookAt(vec3.x, vec3.y, vec3.z);
            render();
        }
        if (callback && typeof callback === 'function')
            callback()
    }
    /**
     * 设置是否可见
     * @param visible
     * @param callback
     */
    const setVisible = (visible, callback = null) => {
        visible = !!visible
        data.node.visible = visible
        render()
        if (callback && typeof callback === 'function')
            callback()
    }
    /**
     * 渲染一帧
     * @param callback
     */
    const render = (callback = null) => {
        vue3d.fire(ev.renderer.render.handler)
        if (callback && typeof callback === 'function') {
            callback()
        }
    }

    onBeforeMount(() => {
        if (!data.node) return
        mount(data.node)
        process.mounted = true
        render()
    })

    onBeforeUnmount(() => {
        if (!data.node) return
        unmount(data.node);
        process.mounted = false;
        render()
    })

    provide('parent', data)

    return {
        vue3d, handler, parent, process, data,
        init, mount, unmount,
        setPosition, setRotation, setScale, setTarget, setVisible,
        render
    }
}