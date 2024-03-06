import {inject, watch} from "vue";
import {TransformControls} from "three/addons/controls/TransformControls.js";

let modeRange = ["translate", "rotate", "scale"]
const spaceRange = ["world", "local"]

export function useTransformControl(camera, props, emits) {
    const stage = inject("stage")
    const scene = inject("scene")

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

    scene.add(tfControl)

    return {tfControl}
}

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
    }
}
