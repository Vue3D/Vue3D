import {Scene} from 'three'

export default function useSceneManager(name) {
    return new SceneManager(name)
}

class SceneManager {

    constructor(name) {
        this._root = this.init(name); // 根场景
        this._scenes = []; // 挂载在根场景下的子场景
        this._index = -1; // 当前激活的场景索引号
        this._focused = false; // 是否进入聚焦当前激活场景的状态

        // 在根节点上加载全部子场景
        this._mountAll = () => {
            this.scenes.forEach(item => {
                this.root.add(item);
            })
        }

        // 在根节点上移除全部子场景
        this._unmountAll = () => {
            this.scenes.forEach(item => {
                this.root.remove(item);
            })
        }
    }

    get root() {
        return this._root;
    }

    get scenes() {
        return this._scenes;
    }

    /**
     * 初始化场景
     * @param name
     * @returns {Scene}
     */
    init(name) {
        let scene = new Scene();
        scene.name = name ? name : scene.uuid;
        return scene;
    }

    /**
     * 添加场景
     * @param scene
     * @returns {*|Scene}
     */
    add(scene) {
        if (typeof scene === 'object' && scene.type === "Scene") {
            this._scenes.push(scene);
        } else if (typeof scene === "string") {
            scene = this.init(scene);
            this._scenes.push(scene);
        } else {
            return false;
        }
        if (!this._focused) {
            this._root.add(scene);
        }
        return scene;
    }

    /**
     * 移除场景
     * @param scene
     */
    remove(scene) {
        let index = this._index;
        if (typeof scene === 'object' && scene.type === "Scene") {
            index = this.scenes.indexOf(scene);
        } else if (typeof scene === "string") {
            index = this.scenes.findIndex(item => item.name === scene);
        } else if (typeof scene === "number") {
            index = scene;
        }
        if (!this._focused) {
            this.root.remove(this.scenes[scene]);
        }
        this.scenes.splice(index, 1);
    }

    /**
     * base scene in focus on sub-scene
     * @param index
     */
    focus(index) {
        if (this._focused) return;
        if (index >= 0 && this.scenes.length > index) {
            this._index = index;
        }
        if (this._index < 0) return;
        this._unmountAll();
        this.root.add(this.root[this._index]);
        this._focused = true;
    }

    /**
     * 离开聚焦激活的场景的状态
     */
    blur() {
        if (!this._focused) return;
        this._mountAll();
        this._focused = false;
    }

    /**
     * Get Active Scene
     * @returns {*}
     */
    getActive() {
        if (this._index >= 0 && this.scenes.length > this._index) {
            return this.scenes[this._index];
        } else {
            return this.root;
        }
    }

    /**
     * Set Active Scene
     * @param {number} index
     */
    setActive(index) {
        if (this.scenes.length > index && index >= 0) {
            this._index = index;
        } else {
            this._index = -1;
        }
    }

    /**
     * Get Scene by scene index
     * @param index
     * @returns {*}
     */
    getSceneByIndex(index) {
        if (index >= 0 && this.scenes.length > index) {
            return this.scenes[index];
        }
    }

}
