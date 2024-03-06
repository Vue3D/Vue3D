import {Raycaster, Vector2} from "three";
import {inject, watch} from "vue";
import {ev} from "../../../event";

export function useRaycaster(camera, props, emits) {
    if (!props.withRay) return
    const stage = inject("stage")

    const pointer = new Vector2();
    const raycaster = new Raycaster()

    let charging = false // 充能

    if (Array.isArray(props.withRay)) {
        for (let layer of props.withRay) {
            raycaster.layers.enable(layer)
        }
    }

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

    stage.dom.addEventListener("pointerup", function (e) {
        if (charging && e.button === 0) {
            e.preventDefault();
            // camera.viewport.z 宽度
            pointer.x = ((e.clientX - stage.dom.getBoundingClientRect().left - camera.viewport.x) / camera.viewport.z) * 2 - 1;
            // camera.viewport.z 高度
            pointer.y = -((e.clientY - stage.dom.getBoundingClientRect().top - camera.viewport.y) / camera.viewport.w) * 2 + 1;
            // 发射射线
            raycaster.setFromCamera(pointer, camera);
            // 射线检测对象。参数二 recursive: 遍历检测子物体
            const targets = raycaster.intersectObjects(stage.root.scene, true)
            console.log(stage.root.scene)
            emits("cast", targets)
            // 提取最优解
            if (targets.length > 0) {
                let best = null
                for (let target of targets) {
                    best = getTarget(target.object)
                    if (best) break
                }
                emits("pick", best)
                stage.event.emit(ev.selected.command.attach, best, stage.id)
            } else {
                emits("pick", null)
            }
        }
        charging = false
    }, false)

    watch(() => props.rayFar, (val) => {
        raycaster.far = val
    }, {immediate: true})
    watch(() => props.rayNear, (val) => {
        raycaster.near = val
    }, {immediate: true})

    return {raycaster}
}

export const raycasterEmits = ["cast", "pick"]
export const raycasterProps = {
    withRay: {type: [Boolean, Array], default: true},
    rayFar: {type: Number},
    rayNear: {type: Number}
}
