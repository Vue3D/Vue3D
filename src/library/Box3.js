import {Box3 as THREE_BOX3, Vector3} from "three";

export default class Box3 {
    size = new Vector3()
    center = new Vector3()

    constructor(object3d) {
        this.object3d = object3d
        const box = new THREE_BOX3();
        box.setFromObject(object3d);
        box.getSize(this.size);
        box.getCenter(this.center)
    }

    getSize() {
        return this.size
    }

    getCenter() {
        return this.center
    }

    getContainedScale(vec3 = new Vector3(10, 10, 10)) {
        let scale = 1
        if (this.size.x > this.size.y) {
            scale = Math.round(vec3.x / this.size.x * 100) / 100
        } else {
            scale = Math.round(vec3.y / this.size.y * 100) / 100
        }
        return scale
    }
}
