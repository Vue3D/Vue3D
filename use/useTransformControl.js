import {inject, reactive, toRaw, watch} from "vue";
import {TransformControls} from "three/addons/controls/TransformControls.js";
import {noop} from "@unjuanable/jokes";

const modeRange = ["translate", "rotate", "scale"]
const spaceRange = ["world", "local"]

const transformControlEmits = ["update:mode", "update:space"]
const transformControlProps = {
    mode: {
        type: String, validator(val) {
            return modeRange.includes(val)
        }
    },
    space: {
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

function useTransformControl(camera, props, emits) {
    const stage = inject("stage")

    let mode = "translate", space = "world" // default value

    const control = new TransformControls(camera, stage.dom)
    const onChange = reactive({
        callback: noop
    })

    control.addEventListener("objectChange", (e) => {
        onChange.callback && onChange.callback(control.object)
        stage.render()
    });

    watch(() => props.mode, (val) => {
        if (val === mode || !modeRange.includes(val)) return
        mode = val
        control.setMode(mode)
    }, {immediate: true})

    watch(() => props.space, (val) => {
        if (val === space || !spaceRange.includes(val)) return
        space = val
        control.setSpace(space)
    }, {immediate: true})

    watch(() => props.target, (val) => {
        if (val && val.isObject3D) {
            control.attach(toRaw(val))
        } else {
            control.detach()
        }
    }, {immediate: true})

    return {control, onChange}
}

export {transformControlProps, transformControlEmits, useTransformControl, modeRange, spaceRange}


