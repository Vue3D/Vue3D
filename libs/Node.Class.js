export class Node {
    uuid
    type
    obj3
    parent = null
    children = []

    /**
     *
     * @param obj3 {object}
     * @param uuid {string}
     * @param type {string}
     */
    constructor(obj3, uuid, type) {
        if (!obj3 || !obj3.isObject3D) return

        this.obj3 = obj3
        this.uuid = uuid
        this.type = type

    }
}

export class SceneNode extends Node {
    constructor(scene, uuid, type) {
        if (!scene?.isScene) return
        super(scene, uuid, type);

        this.scene = scene
        this.mainCamera = null
    }
}

export class StageNode extends SceneNode {
    dom = null // Canvas DOM
    renderer = null
    render = Function.prototype
    width
    height

    constructor(scene, uuid, type) {
        super(scene, uuid, type);
    }
}
