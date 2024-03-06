import {inject, onBeforeMount, onBeforeUnmount, provide, toRaw} from "vue";
import {Scene} from "three";

export function createRoot(uuid, componentName) {
    const scene = new Scene()
    const root = new RootNode(scene, componentName, uuid)

    provide('scene', scene)
    provide('parent', root)

    return {root, scene}
}

export function useNode(object3d, uuid, componentName = "V3dComponent") {
    const createNode = () => {
        return new Node(object3d, componentName, uuid)
    }

    const createSceneNode = () => {
        const sceneNode = new SceneNode(object3d, componentName, uuid)
        provide('scene', object3d)
        provide('parent', sceneNode)
    }

    return {
        mount, unmount, createNode, createSceneNode
    }
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
        this.add = (object3d, type, uuid) => {
            const stage = inject('stage')
            const parent = inject('parent')

            /**
             * 在父节点上挂载
             * @param object3d
             */
            const mount = (object3d) => {
                if (parent?.node) {
                    parent.node?.add(toRaw(object3d));
                }
                stage.render()
            }

            /**
             * 在父节点上卸载
             * @param object3d
             */
            const unmount = (object3d) => {
                if (parent.node) {
                    parent.node?.remove(toRaw(object3d));
                }
                stage.render()
            }

            const node = new Node(toRaw(object3d), type, uuid)

            node.parnet = this
            this.children.push(node)

            onBeforeMount(() => {
                if (!node) return
                mount(object3d)
            })

            onBeforeUnmount(() => {
                if (!node) return
                unmount(object3d)
            })

            return node
        }
    }

}

class SceneNode extends Node {
    constructor(scene, type, uuid) {
        super(scene, type, uuid);
        if (!scene?.isScene) return
        this.scene = scene
        this.mainCamera = null
    }
}

class RootNode extends SceneNode {
    constructor(scene, type, uuid) {
        super(scene, type, uuid);

        /**
         * 添加子场景
         * @param type
         * @param uuid
         * @returns {{scene: Scene}}
         */
        this.addScene = (type, uuid) => {
            const scene = new Scene()
            const node = new SceneNode(scene, type, uuid)
            node.parent = this
            this.scene.add(scene)
            this.children.push(node)
            return {scene}
        }
    }
}


