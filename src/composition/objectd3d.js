import {inject, markRaw, provide, reactive, onBeforeMount, onBeforeUnmount} from "vue";
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
        type: Object,
        default() {
            return new Vector3(1, 1, 1)
        }
    },
    target: {
        type: Object,
        default() {
            return new Vector3()
        }
    },
    visible: {type: Boolean, default: true}
}

export function useObject3d() {
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
            data.node.position.set(vec3.x, vec3.y, vec3.z)
            render();
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
            const x = angle2euler(vec3.x);
            const y = angle2euler(vec3.y);
            const z = angle2euler(vec3.z);
            let euler = new Euler(x, y, z);
            data.node.setRotationFromEuler(euler);
            render();
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
        if (vec3 && vec3.hasOwnProperty('x') && vec3.hasOwnProperty('y') && vec3.hasOwnProperty('z')) {
            data.node.scale.set(vec3.x, vec3.y, vec3.z)
            render();
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
        setPosition, setRotation, setScale, setTarget,
        render
    }
}