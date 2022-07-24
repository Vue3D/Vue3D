import {Euler, Vector3} from "three";
import * as THREE from "three";

export default class Box3 {
    size = new Vector3()
    center = new Vector3()

    constructor(object3d) {
        this.object3d = object3d
        const box = new THREE.Box3();
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
            scale = vec3.x / this.size.x
        } else {
            scale = vec3.y / this.size.y
        }
        return scale
    }
}