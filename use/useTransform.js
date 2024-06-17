import {computed, inject, reactive, watch} from "vue";
import {Euler, Vector3} from "three";

export function useTransform(object3d, props, emits) {
    const stage = inject('stage')
    const euler = new Euler(0, 0, 0, "XYZ")
    const eAngle = reactive(new Vector3())

    const position = computed({
        get() {
            return object3d.position
        },
        set(val) {
            val = Object.assign(object3d.position, val)
            object3d.position.set(val.x, val.y, val.z)
            emits('update:position', val)
            stage.render();
        }
    })
    const scale = computed({
        get() {
            return object3d.scale
        },
        set(val) {
            val = Object.assign(object3d.scale, val)
            object3d.scale.set(val.x, val.y, val.z)
            emits('update:scale', val)
            stage.render();
        }
    })
    const angle = computed({
        get() {
            euler.setFromQuaternion(object3d.quaternion);
            eAngle.set(euler2angle(euler.x), euler2angle(euler.y), euler2angle(euler.z))
            return eAngle
        },
        set(val) {
            if (object3d.constructor.name === "CubeGeom") {
                Object.assign(eAngle, val)
                euler.x = angle2euler(eAngle.x)
                euler.y = angle2euler(eAngle.y)
                euler.z = angle2euler(eAngle.z)
                object3d.quaternion.setFromEuler(euler)
                emits('update:angle', eAngle)
            }
            stage.render();
        }
    })

    ///// 监听props
    watch(() => props.position, () => {
        position.value = props.position
    }, {deep: false, immediate: true})
    watch(() => props.scale, () => {
        scale.value = props.scale
    }, {deep: true, immediate: true})
    watch(() => props.angle, () => {
        angle.value = props.angle
    }, {deep: true, immediate: true})

    ///// 监听object3dwe
    watch(() => position.value, (val) => {
        emits('update:position', val)
        stage.render()
    }, {deep: true})
    watch(() => scale.value, (val) => {
        emits('update:scale', val)
        stage.render()
    }, {deep: true})
    watch(() => angle.value, (val) => {
        emits('update:angle', val)
        stage.render()
    }, {deep: true})

    return {position, scale, angle}
}

export const transformEmits = ['update:position', 'update:scale', 'update:angle']
export const transformProps = {
    position: {
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
    angle: {
        type: Object,
        default() {
            return new Vector3()
        },
    },
}

/**
 * 夹角转欧拉角
 * @param angle
 * @returns {number}
 */
export const angle2euler = (angle) => {
    const euler = (angle % 360) / 180;
    return euler * Math.PI
}

/**
 * 欧拉角转夹角
 * @param euler
 * @returns {number}
 */
export const euler2angle = (euler) => {
    let angle = euler / Math.PI
    return angle * 180;
}

