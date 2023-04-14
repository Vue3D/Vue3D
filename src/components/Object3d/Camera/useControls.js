import {inject, watch} from "vue";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {TransformControls} from "three/addons/controls/TransformControls.js";
import {ev} from "../../../const/event";

let modeRange = ["translate", "rotate", "scale"]
const spaceRange = ["world", "local"]

export function useControls(camera, props, ctx) {
    const stage = inject("stage")
    let orbit, tf
    // Orbit
    if (props.control && props.control.includes("orbit")) {
        orbit = new OrbitControls(camera, stage.dom)

        watch(() => props.autoRotate, (val) => {
            if (props.autoRotate > 0) {
                orbit.autoRotate = true
                orbit.autoRotateSpeed = props.autoRotate
            }
        }, {immediate: true})
        orbit.addEventListener("change", stage.render, true)
        stage.delegation.add(orbit.update)
    }

    // Transform
    if (props.control && props.control.includes("transform")) {
        const $vue3d = inject("$vue3d")

        tf = new TransformControls(camera, stage.dom)
        let mode = "translate", space = "world" // default value

        tf.addEventListener('change', stage.render);
        tf.addEventListener('dragging-changed', function (event) {
            orbit.enabled = !event.value;
        });

        watch(() => props.tfMode, (val) => {
            if (val === mode || !modeRange.includes(val)) return
            mode = val
            tf.setMode(mode)
        }, {immediate: true})
        watch(() => props.tfSpace, (val) => {
            if (val === space || !spaceRange.includes(val)) return
            space = val
            tf.setSpace(space)
        }, {immediate: true})
        // set target
        $vue3d.on(ev.selected.attach.handler, (target) => {
            if (target) {
                tf.attach(target)
            } else {
                tf.detach()
            }
        }, stage.id)
        // set transform mode
        $vue3d.on(ev.selected.tfMode.handler, (val) => {
            if (!modeRange.includes(val)) return
            mode = val
            tf.setMode(val)
            ctx.emit("update:tfMode", val)
        }, stage.id)
        // set transform space
        $vue3d.on(ev.selected.tfSpace.handler, (val) => {
            if (val && ["world", "local"].includes(val)) {
                space = val
            } else {
                space = space === "world" ? "local" : "world"
            }
            tf.setSpace(space)
            ctx.emit("update:tfSpace", space)
        }, stage.id)

        stage.scene.add(tf)
    }

    return {orbit, tf}
}

export const controlsEmits = ["update:tfMode", "update:tfSpace"]
export const controlsProps = {
    control: {type: Array},
    autoRotate: {type: Number, default: 0}, // 必须stage的属性auto=true
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
