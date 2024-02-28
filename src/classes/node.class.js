export const TYPE = {
    STAGE: "stage",
    SCENE: "scene",
    CAMERA: "camera",
    LIGHT: "light",
    OBJECT3D: "object3d"
}

export class Node {
    /**
     * 舞台节点树
     * @param node {object}
     * @param type {string.<TYPE>}
     * @param name {string}
     */
    constructor(node, type, name = "") {
        this.node = node
        this.type = type
        this.name = name;
    }
}

