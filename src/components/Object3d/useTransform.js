import {Euler, Vector3} from "three";
import {noop} from "@unjuanable/jokes";
import {angle2euler} from "../../utils";
import {inject, reactive, toRaw, watch, watchEffect} from "vue";

export function useTransform(object3d, props, ctx) {
    const stage = inject('stage')

    /**
     * Set Position
     * @param pos
     * @param callback
     */
    const setPosition = (pos, callback = noop) => {
        if (!pos) return
        let vec3 = Object.assign(new Vector3(), pos)
        object3d.position.set(vec3.x, vec3.y, vec3.z)
        stage.render(callback);
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
        let euler = reactive(new Euler(x, y, z));
        object3d.setRotationFromEuler(euler);
        ctx.emit('update:rotation', angle)
        stage.render(callback);
    }
    /**
     * Set Scale
     * @param scale
     * @param callback
     */
    const setScale = (scale, callback = noop) => {
        if (!scale) return
        let vec3 = new Vector3(1, 1, 1)
        if (typeof scale === 'object') {
            vec3 = Object.assign(vec3, scale)
        } else if (typeof scale === 'number') {
            vec3.x = scale
            vec3.y = scale
            vec3.z = scale
        }
        object3d.scale.set(vec3.x, vec3.y, vec3.z)
        ctx.emit('update:scale', scale)
        stage.render(callback);
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
        object3d.lookAt(vec3.x, vec3.y, vec3.z);
        stage.render(callback);
    }

    ///// 监听
    watch(() => props.position, (val, oldValue) => {
        if (val === oldValue) return
        setPosition(props.position)
    }, {deep: true, immediate: true})
    watch(() => props.rotation, (val, oldValue) => {
        if (val === oldValue) return
        setRotation(props.rotation)
    }, {deep: true, immediate: true})
    watch(() => props.scale, (val, oldValue) => {
        if (val === oldValue) return
        setScale(props.scale)
    }, {deep: true, immediate: true})
    watch(() => props.target, (val, oldValue) => {
        setTarget(props.target)
    }, {deep: true, immediate: true})

    watch([() => object3d.position.x, () => object3d.position.y, () => object3d.position.z], ([x, y, z]) => {
        ctx.emit('update:position', {x, y, z})
    })
    watch([() => object3d.rotation.x, () => object3d.rotation.y, () => object3d.rotation.z], ([x, y, z]) => {
        ctx.emit('update:rotation', {x, y, z})
    })
    watch([() => object3d.scale.x, () => object3d.scale.y, () => object3d.scale.z], ([x, y, z]) => {
        ctx.emit('update:scale', {x, y, z})
    })

    return {setPosition, setRotation, setScale, setTarget}
}

export const transformEmits = ['update:position', 'update:scale', 'update:rotation']
export const transformProps = {
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
}


