import {inject, markRaw, onBeforeUnmount, onMounted, provide, reactive, toRef} from "vue";
import {Vector3, Euler} from "three";
import {angle2euler} from "../utils";

import {ev} from "../const/event";

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

export const object3dEmits = ['update', 'remove']

export function useObject3d(object3d) {
    const vue3d = inject('vue3d')
    const handler = inject('handler')
    const parent = inject('parent')

    const process = reactive({
        mounted: false, // 挂载完成
        loaded: false, // 加载完成
    })

    const setPosition = (val) => {
        if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
            object3d.position.set(val.x, val.y, val.z)
        }
        // emit("update:position", object3d.position);
        render();
    }
    const setRotation = (val) => {
        if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
            const x = angle2euler(val.x);
            const y = angle2euler(val.y);
            const z = angle2euler(val.z);
            let euler = new Euler(x, y, z);
            object3d.setRotationFromEuler(euler);
        }
        // this.$emit("update:rotation", object3d.rotation);
        render();
    }
    const setScale = (val) => {
        if (val && val.hasOwnProperty('x') && val.hasOwnProperty('y') && val.hasOwnProperty('z')) {
            object3d.scale.set(val.x, val.y, val.z)
        }
        // this.$emit("update:scale", object3d.scale);
        render();
    }
    const setTarget = (target) => {
        object3d.lookAt(target.x, target.y, target.z);
        render();
    }

    const addObject3d = (object3d) => {
        if (parent) {
            parent.add(object3d);
        }
    }
    const removeObject3d = (object3d) => {
        if (parent) {
            parent.remove(object3d);
        }
    }
    // 渲染
    const render = () => {
        vue3d.fire(ev.renderer.render.handler)
        // this.$emit('update', object3d);
    }

    onBeforeUnmount(() => {
        removeObject3d(object3d);
        object3d = null
        process.mounted = false;
        // this.$emit('remove', this.object3d);
    })

    return {
        vue3d, handler, parent,
        object3d, process,
        setPosition, setRotation, setScale, setTarget, addObject3d, removeObject3d, render
    }
}