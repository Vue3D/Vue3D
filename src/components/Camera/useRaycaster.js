import {Raycaster, Vector2} from "three";
import {inject, watch} from "vue";

export function useRaycaster(camera, props, ctx) {
    if (!props.withRay) return
    const stage = inject("stage")
    const pointer = new Vector2();
    const raycaster = new Raycaster()

    let charging = false // 充能

    watch(() => props.rayFar, (val) => {
        setFar(val)
    })
    watch(() => props.rayNear, (val) => {
        setNear(val)
    })

    const setFar = (far) => {
        raycaster.far = far
    }
    const setNear = (near) => {
        raycaster.near = near
    }

    stage.dom.addEventListener("pointerdown", function (event) {
        if (event.button === 0) {
            charging = true
        }
    }, false)

    stage.dom.addEventListener("pointermove", function (event) {
        if (charging) charging = false
    }, false)

    stage.dom.addEventListener("pointerup", function (event) {
        if (charging && event.button === 0) {
            event.preventDefault();
            pointer.x = ((event.clientX - camera.viewport.x) / camera.viewport.w) * 2 - 1;
            pointer.y = -((event.clientY - camera.viewport.y) / camera.viewport.z) * 2 + 1;
            raycaster.setFromCamera(pointer, camera);
            // 射线检测对象。参数二 recursive: 遍历检测子物体
            const targets = raycaster.intersectObjects(stage.scene.children, true)
            ctx.emit("raycast", targets)
        }
        charging = false
    }, false)

    if (props.rayLayer) {
        for (let layer of props.rayLayer) {
            raycaster.layers.enable(layer)
        }
    }

    return {raycaster}
}

export const raycasterEmits = ["raycast"]
export const raycasterProps = {
    withRay: {type: Boolean, default: true},
    rayLayer: {type: Array},
    rayFar: {type: Number},
    rayNear: {type: Number}
}
