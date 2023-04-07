import {Raycaster, Vector2} from "three";
import {noop} from "@unjuanable/jokes";

/**
 * 使用射线
 * @param camera 发射射线的摄像机
 * @param stage 当前舞台节点
 * @param layers 可以捕获的对象图层
 * @param callback
 */
export default function useRaycaster(camera, stage, layers = [], callback = noop) {
    const pointer = new Vector2();
    const raycaster = new Raycaster()

    let charging = false // 充能

    /**
     * 调整射线距离参数
     * @param near
     * @param far
     */
    const setRay = (near, far) => {
        if (!near) near = 0;
        if (near) raycaster.near = near;
        if (far && far > near) raycaster.far = far;
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
            for (let layer of layers) {
                raycaster.layers.enable(layer)
            }
            const targets = raycaster.intersectObjects(stage.scene.children, false)
            callback && callback(targets)
            console.log(targets)
            console.log(stage.scene.children)
            console.log(raycaster)
        }
        charging = false
    }, false)

    return {raycaster}
}
