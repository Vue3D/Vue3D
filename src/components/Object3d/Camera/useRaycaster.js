import {Raycaster, Vector2} from "three";
import {inject, watch} from "vue";
import {ev} from "../../../const/event";

export function useRaycaster(camera, props, ctx) {
    if (!props.withRay) return
    const $vue3d = inject("$vue3d")
    const stage = inject("stage")
    const pointer = new Vector2();
    const raycaster = new Raycaster()

    let charging = false // 充能

    /**
     * 从捕获对象中选择最近对象
     * @param target
     * @returns {{isVue3d}|*|null}
     */
    const getTarget = (target) => {
        if (!target) {
            return null
        }
        if (target && target.hasOwnProperty("isVue3d") && target.isVue3d) {
            return target
        } else {
            return getTarget(target.parent)
        }
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
            // 提取最优解
            if (targets.length > 0) {
                let best = null
                for (let target of targets) {
                    best = getTarget(target.object)
                    if (best) break
                }
                ctx.emit("pick", best)
                $vue3d.emit(ev.selected.attach.handler, best, stage.id)
            } else {
                ctx.emit("pick", null)
            }
        }
        charging = false
    }, false)

    if (Array.isArray(props.withRay)) {
        for (let layer of props.withRay) {
            raycaster.layers.enable(layer)
        }
    }

    watch(() => props.rayFar, (val) => {
        raycaster.far = val
    }, {immediate: true})
    watch(() => props.rayNear, (val) => {
        raycaster.near = val
    }, {immediate: true})

    return {raycaster}
}

export const raycasterEmits = ["raycast", "pick"]
export const raycasterProps = {
    withRay: {type: [Boolean, Array], default: true},
    rayFar: {type: Number},
    rayNear: {type: Number}
}
