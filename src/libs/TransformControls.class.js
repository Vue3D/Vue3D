import {TransformControls} from 'three/addons/controls/TransformControls.js';

/**
 * 模型变换控制器类
 * @param camera 主摄像机
 * @param canvas 画布
 * @returns {{enabled: void, update(): void}}
 */
export default class {
    constructor(camera, canvas) {
        this.control = new TransformControls(camera, canvas);
        return this;
    }

    update() {
        this.control.update();
    }

    get enabled() {
        this.control.enabled = true;
    }

    set enabled(val) {
        this.control.enabled = val;
    }
}
