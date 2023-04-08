import {inject, watch} from "vue";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {TransformControls} from "three/addons/controls/TransformControls.js";

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
        tf = new TransformControls(camera, stage.dom)
        watch(() => props.tfMode, (val) => {
            tf.setMode(val)
        }, {immediate: true})
        watch(() => props.tfSpace, (val) => {
            tf.setSpace(val)
        }, {immediate: true})
        tf.addEventListener('change', stage.render);
        tf.addEventListener('dragging-changed', function (event) {
            orbit.enabled = !event.value;
        });
        tf.layers.disable(props.rayLayer)
        console.log(tf)
        stage.scene.add(tf)
    }

    return {orbit, tf}
}

export const controlsProps = {
    control: {type: Array},
    autoRotate: {type: Number, default: 0}, // 必须stage的属性auto=true
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
