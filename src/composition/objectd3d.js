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

        watch(() => props.visible, (val, oldValue) => {
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
     * @param pos
     * @param callback
     */
    const setPosition = (pos, callback = null) => {
        if (!pos) return
        let vec3 = new Vector3()
        vec3.x = pos.hasOwnProperty('x') ? pos.x : 0
        vec3.y = pos.hasOwnProperty('y') ? pos.y : 0
        vec3.z = pos.hasOwnProperty('z') ? pos.z : 0
        data.node.position.set(vec3.x, vec3.y, vec3.z)
        render();
        ctx.emit('update:position', pos)
        if (callback && typeof callback === 'function')
            callback()
    }
    /**
     * Set Rotation
     * @param angle
     * @param callback
     */
    const setRotation = (angle, callback = null) => {
        if (!angle) return
        let vec3 = new Vector3()
        vec3.x = angle.hasOwnProperty('x') ? angle.x : 0
        vec3.y = angle.hasOwnProperty('y') ? angle.y : 0
        vec3.z = angle.hasOwnProperty('z') ? angle.z : 0
        const x = angle2euler(vec3.x);
        const y = angle2euler(vec3.y);
        const z = angle2euler(vec3.z);
        let euler = new Euler(x, y, z);
        data.node.setRotationFromEuler(euler);
        render();
        ctx.emit('update:rotation', angle)
        if (callback && typeof callback === 'function')
            callback()
    }
    /**
     * Set Scale
     * @param scale
     * @param callback
     */
    const setScale = (scale, callback = null) => {
        if (!scale) return
        let vec3 = new Vector3()
        if (typeof scale === 'object') {
            vec3.x = scale.hasOwnProperty('x') ? scale.x : 0
            vec3.y = scale.hasOwnProperty('y') ? scale.y : 0
            vec3.z = scale.hasOwnProperty('z') ? scale.z : 0
        } else if (typeof scale === 'number') {
            vec3.x = scale
            vec3.y = scale
            vec3.z = scale
        }
        data.node.scale.set(vec3.x, vec3.y, vec3.z)
        render();
        ctx.emit('update:scale', scale)
        if (callback && typeof callback === 'function')
            callback()
    }
    /**
     * Set Target
     * @param target
     * @param callback
     */
    const setTarget = (target, callback = null) => {
        if (!target) return
        let vec3 = new Vector3()
        vec3.x = target.hasOwnProperty('x') ? target.x : 0
        vec3.y = target.hasOwnProperty('y') ? target.y : 0
        vec3.z = target.hasOwnProperty('z') ? target.z : 0
        data.node.lookAt(vec3.x, vec3.y, vec3.z);
        render();
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