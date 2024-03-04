import {inject, watch} from "vue";
import {TransformControls} from "three/addons/controls/TransformControls.js";
import {ev} from "../../../event";

let modeRange = ["translate", "rotate", "scale"]
const spaceRange = ["world", "local"]

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
    // set target
    stage.event.on(ev.selected.attach.handler, (target) => {
        if (target) {
            tfControl.attach(target)
        } else {
            tfControl.detach()
        }
    })
    // set transform mode
    stage.event.on(ev.selected.tfMode.handler, (val) => {
        if (!modeRange.includes(val)) return
        mode = val
        tfControl.setMode(val)
        emits("update:tfMode", val)
    })
    // set transform space
    stage.event.on(ev.selected.tfSpace.handler, (val) => {
        if (val && ["world", "local"].includes(val)) {
            space = val
        } else {
            space = space === "world" ? "local" : "world"
        }
        tfControl.setSpace(space)
        emits("update:tfSpace", space)
    }, stage.id)

    stage.root.add(tfControl, "V3dTransformControl", "V3dTransformControl")
    stage.root.node.add(tfControl)

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
