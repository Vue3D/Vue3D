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
    extends = []

    constructor(obj3, uuid, type) {
        this.obj3 = toRaw(obj3)
        this.uuid = uuid
        this.type = type
    }

    /**
     * 设置父节点
     * @param parent
     */
    setParent(parent) {
        if (parent && parent.obj3.isObject3D) {
            this.parent = parent
        } else {
            throw new Error("Unhandled parent")
        }
        return this
    }

    /**
     * 添加对象
     */
    add() {
        if (this.parent) {
            this.parent.obj3?.add(toRaw(this.obj3)); // three.js
            return this;
        }
    }

    sceneAdd() {

    }

    remove() {
        if (this.parent) {
            this.parent.obj3?.remove(toRaw(this.obj3)); // three.js
            return this;
        }
    }

    /**
     * 挂载节点
     */
    mount() {
        if (this.parent) {
            this.stage = this.parent.stage
            this.parent.children.push(this); // node tree
            return this
        }
    }


    /**
     * 卸载节点
     */
    unmount() {
        if (this.parent) {
            const index = this.parent.children.indexOf(toRaw(this.obj3))
            this.parent.children.splice(index, 1); // node tree
            delete this
        }
    }

    hasType(type) {
        for (let item of this.children) {
            if (item.type === type) {
                return true
            }
        }
        for (let item of this.extends) {
            if (item.type === type) {
                return true
            }
        }
        return false
    }

    /**
     * 通过节点类型获取一个子节点
     * @param type
     * @returns {null}
     */
    getByType(type) {
        for (let item of this.children) {
            if (item.type === type) {
                return item
            }
        }
        for (let item of this.extends) {
            if (item.type === type) {
                return item
            }
        }
        return null
    }

    /**
     * 通过节点类似获取匹配的所有子节点
     * @param type
     * @returns {*[]}
     */
    getsByType(type) {
        const items = []
        for (let item of this.children) {
            if (item.type === type) {
                items.push(item)
            }
        }
        for (let item of this.extends) {
            if (item.type === type) {
                items.push(item)
            }
        }
        return items
    }
}

export class ExtendNode extends Node {
    constructor(extend, uuid, type) {
        super(extend, uuid, type);
    }

    /**
     * 挂载节点
     */
    mount() {
        if (this.parent) {
            this.stage = this.parent.stage
            this.parent.extends.push(this); // node tree
            return this
        }
    }


    /**
     * 卸载节点
     */
    unmount() {
        if (this.parent) {
            const index = this.parent.extends.indexOf(this)
            this.parent.extends.splice(index, 1); // node tree
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
    activated

    constructor(scene, uuid, type) {
        super(scene, uuid, type);
        this.stage = this
        this.activated = this
    }

    /**
     * 激活场景
     * @param node {SceneNode}
     */
    setActive(node) {
        this.activated = node
    }
}
