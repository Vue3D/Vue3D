import {inject, toRaw, watch} from "vue";
import {TransformControls} from "three/addons/controls/TransformControls.js";

export function useTransformControl(camera, props, emits) {
    const stage = inject("stage")

    const tfControl = new TransformControls(camera, stage.dom)

    let mode = "translate", space = "world" // default value

    tfControl.addEventListener('change', stage.render);

    watch(() => props.tfMode, (val) => {
        if (val === mode || !modeRange.includes(val)) return
        mode = val
        tfControl.setMode(mode)
    }, {immediate: true})

    watch(() => props.tfSpace, (val) => {
        if (val === space || !spaceRange.includes(val)) return
        space = val
        tfControl.setSpace(space)
    }, {immediate: true})

    watch(() => props.target, (val) => {
        if (val && val.isObject3D) {
            tfControl.attach(toRaw(val))
        } else {
            tfControl.detach()
        }
    }, {immediate: true})

    return {tfControl}
}

export const modeRange = ["translate", "rotate", "scale"]
export const spaceRange = ["world", "local"]

export const transformControlEmits = ["update:tfMode", "update:tfSpace"]
export const transformControlProps = {
    tfMode: {
        type: String, validator(val) {
            return modeRange.includes(val)
        }
    },
    tfSpace: {
        type: String, validator(val) {
            return spaceRange.includes(val)
        }
    },
    target: {
        type: [Object, null], validator(val) {
            return (val && val.isObject3D)
        }
    }
}
