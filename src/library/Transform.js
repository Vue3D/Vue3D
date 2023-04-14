import {TransformControls} from 'three/addons/controls/TransformControls.js';

class Transform {
    constructor(camera, canvas) {
        this.control = new TransformControls(camera, canvas);
        // camera.position.set(0, 0, 10); // 给摄像机一个初始位置
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

export default Transform
