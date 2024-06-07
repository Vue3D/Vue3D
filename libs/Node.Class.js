import {toRaw} from "vue";

/**
 * 普通节点
 */
export class Node {
    uuid
    type
    obj3
    stage
    parent = null
    children = []

    constructor(obj3, uuid, type) {
        if (!obj3 || !obj3.isObject3D) return
        this.obj3 = toRaw(obj3)
        this.uuid = uuid
        this.type = type
    }

    /**
     * 挂载节点
     */
    mount() {
        if (this.parent && this.parent.obj3.isObject3D) {
            this.stage = this.parent.stage
            this.parent.obj3?.add(toRaw(this.obj3)); // three.js
            this.parent.children.push(this); // node tree
        }
    }

    /**
     * 卸载节点
     */
    unmount() {
        if (this.parent && this.parent.obj3.isObject3D) {
            this.parent.obj3?.remove(toRaw(this.obj3)); // three.js
            const index = this.children.indexOf(toRaw(this.obj3))
            this.parent.children.splice(index, 1); // node tree
            delete this
        }
    }
}

/**
 * 场景节点
 */
export class SceneNode extends Node {
    constructor(scene, uuid, type) {
        if (!scene?.isScene) return
        super(scene, uuid, type);

        this.scene = scene
        this.mainCamera = null
    }
}

/**
 * 舞台节点
 */
export class StageNode extends SceneNode {
    dom = null // Canvas DOM
    renderer = null
    render = Function.prototype
    width
    height

    constructor(scene, uuid, type) {
        super(scene, uuid, type);
        this.stage = this
    }
}
