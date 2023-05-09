import {Euler, Vector3} from "three";
import {noop} from "@unjuanable/jokes";
import {angle2euler, euler2angle} from "../../utils";
import {inject, watch} from "vue";
import {ev} from "../../const/event"

export function useTransform(object3d, props, ctx) {
    const $vue3d = inject("$vue3d")
    const stage = inject('stage')
    const position = new Vector3()
    const angle = new Vector3()
    const scale = new Vector3(1, 1, 1)

    /**
     * Set Position
     * @param vec3
     * @param callback
     */
    const setPosition = (vec3, callback = noop) => {
        if (!vec3) return
        Object.assign(position, vec3)
        object3d.position.set(position.x, position.y, position.z)
        // ctx.emit('update:position', {x: vec3.x, y: vec3.y, z: vec3.z})
        stage.render(callback);
    }
    /**
     * Set Rotation
     * @param vec3
     * @param callback
     */
    const setRotation = (vec3, callback = noop) => {
        if (!vec3) return
        Object.assign(angle, vec3)
        const x = angle2euler(angle.x);
        const y = angle2euler(angle.y);
        const z = angle2euler(angle.z);
        let euler = new Euler(x, y, z)
        object3d.rotation.set(euler.x, euler.y, euler.z);
        // ctx.emit('update:rotation', {x: vec3.x, y: vec3.y, z: vec3.z})
        stage.render(callback);
    }
    /**
     * Set Scale
     * @param vec3
     * @param callback
     */
    const setScale = (vec3, callback = noop) => {
        if (!vec3) return
        if (typeof vec3 === 'object') {
            Object.assign(scale, vec3)
        } else if (typeof vec3 === 'number') {
            scale.x = vec3
            scale.y = vec3
            scale.z = vec3
        }
        object3d.scale.set(scale.x, scale.y, scale.z)
        // ctx.emit('update:scale', {x: vec3.x, y: vec3.y, z: vec3.z})
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
        $vue3d.emit(ev.selected.transform.handler, object3d)
    })
    watch(() => object3d.quaternion, (val) => {
        let x = euler2angle(object3d.rotation.x)
        let y = euler2angle(object3d.rotation.y)
        let z = euler2angle(object3d.rotation.z)
        ctx.emit('update:rotation', {x, y, z})
        $vue3d.emit(ev.selected.transform.handler, object3d)
    }, {deep: true})
    watch([() => object3d.scale.x, () => object3d.scale.y, () => object3d.scale.z], ([x, y, z]) => {
        ctx.emit('update:scale', {x, y, z})
        $vue3d.emit(ev.selected.transform.handler, object3d)
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

