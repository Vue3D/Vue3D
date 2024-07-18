import {inject, toRaw, watch} from "vue";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const orbitControlEmits = []
const orbitControlProps = {
    autoRotate: {type: Number, default: 0}, // stage的属性auto必须为true
}

/**
 * Orbit Control
 * @param camera
 * @param props
 * @param emits
 * @returns {{orbit: OrbitControls}}
 */
function useOrbitControl(camera, props, emits) {
    const stage = inject("stage")

    const orbit = new OrbitControls(toRaw(camera), stage.dom)

    watch(() => props.autoRotate, (val) => {
        if (props.autoRotate > 0) {
            orbit.autoRotate = true
            orbit.autoRotateSpeed = props.autoRotate
        }
    }, {immediate: true})

    orbit.addEventListener("change", stage.render, true)

    stage.renderer.renderCall(next => {
        next()
        orbit.update()
    })

    return {orbit}
}

export {orbitControlProps, orbitControlEmits, useOrbitControl}
