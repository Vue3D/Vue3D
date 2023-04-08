import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {inject} from "vue";
import {or} from "three/nodes";

export function useOrbitControls(camera, props, ctx) {
    if (!props.withOrbit) return
    const stage = inject("stage")
    const orbit = new OrbitControls(camera, stage.dom)
    orbit.addEventListener("change", () => {
        stage.render()
    }, true)
    orbit.update()
    return {orbit}
}

export const orbitControlsProps = {
    withOrbit: {type: Boolean, default: false},
    autoOrbit: {type: Boolean, default: false},
}
