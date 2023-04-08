import {inject, watch} from "vue";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {TransformControls} from "three/addons/controls/TransformControls.js";

export function useControls(camera, props, ctx) {
    const stage = inject("stage")
    let orbit, tf
    // Orbit
    if (props.control && props.control.includes("orbit")) {
        orbit = new OrbitControls(camera, stage.dom)

        watch(() => props.orbitAuto, (val) => {
            orbit.autoRotate = val
        })
        orbit.addEventListener("change", stage.render, true)
        orbit.autoRotate = props.orbitAuto
    }
    // Transform
    if (props.control && props.control.includes("transform")) {
        tf = new TransformControls(camera, stage.dom)
        watch(() => props.tfMode, (val) => {
            tf.setMode(val)
        })
        watch(() => props.tfSpace, (val) => {
            tf.setSpace(val)
        })
        tf.addEventListener('change', stage.render);
        tf.addEventListener('dragging-changed', function (event) {
            orbit.enabled = !event.value;
        });
        tf.setMode(props.tfMode)
        tf.setSpace(props.tfSpace)
        // stage.scene.add(tf)
    }

    return {orbit, tf}
}

export const controlsProps = {
    control: {type: Array},
    orbitAuto: {type: Boolean, default: false},
    tfMode: {
        type: String, default: "translate", validator(val) {
            return ["translate", "rotate", "scale"].includes(val)
        }
    },
    tfSpace: {
        type: String, default: "world", validator(val) {
            return ["world", "local"].includes(val)
        }
    }
}
