/**
 * 创建节点
 * @param object3d
 * @param component
 * @param uuid
 * @returns {Node}
 */
export function createNode(object3d, component, uuid) {
    return new Node(object3d, component, uuid)
}

export function createSceneNode(object3d, component, uuid) {
    return new SceneNode(object3d, component, uuid)
}

class Node {
    constructor(node, type, uuid) {
        this.node = node
        this.type = type
        this.uuid = uuid
        this.parnet = null
        this.children = []

        /**
         * 添加子节点
         */
        this.add = (object3d, component, uuid) => {
            const node = createNode(object3d, component, uuid)
            node.parnet = this
            this.children.push(node)
            return node
        }
    }

}

class SceneNode extends Node {
    constructor(scene, type, uuid) {
        super(scene, type, uuid);
        if (!scene?.isScene) return
        this.scene = scene

        this.addScene = (scene) => {
            const node = createSceneNode(scene, component, uuid)
            node.parnet = this
            this.children.push(node)
            return node
        }
    }
}
