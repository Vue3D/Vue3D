import {toRaw} from "vue";

export class Helper {
    uuid
    type
    obj3
    stage
    parent = null

    constructor(helper, uuid, type) {
        if (!helper) return
        this.obj3 = toRaw(helper)
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
            this.parent.helpers.push(this); // helpers
        }
    }

    /**
     * 卸载节点
     */
    unmount() {
        if (this.parent && this.parent.obj3.isObject3D) {
            this.parent.obj3?.remove(toRaw(this.obj3)); // three.js
            const index = this.parent.children.indexOf(toRaw(this.obj3))
            this.parent.helpers.splice(index, 1); // node tree
            delete this
        }
    }
}
