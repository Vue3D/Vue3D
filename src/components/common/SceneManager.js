import {computed, markRaw, ref} from "vue";
import {Scene} from "three";

export function useSceneManager(uuid) {
    const root = newScene(uuid) // 当前场景
    const children = markRaw([]) // 子场景
    const mainCamera = null
    const cameras = markRaw([])
    const activeIndex = ref(-1) // 激活的子场景序号
    const isFocus = ref(false) // 是否聚焦在子场景，忽略父场景

    /**
     * 新建子场景
     * @returns {Scene}
     */
    function newScene(name) {
        let scene = new Scene();
        scene.name = name ? name : scene.uuid;
        return scene;
    }

    /**
     * 添加子场景
     * @param scene {Scene}
     * @returns {Number}
     */
    function Add(scene) {
        if (typeof scene === 'object' && scene.type === "Scene") {
            children.push(scene);
        } else if (typeof scene === "string") {
            children.push(newScene(scene));
        } else {
            return -1;
        }
        return children - 1;
    }

    /**
     * 剔除子场景
     * @param scene
     */
    function Remove(scene) {
        let index = IndexOfScenes(scene)
        if (index < 0) return
        children.splice(index, 1);
    }

    /**
     * 聚焦指定子场景
     * @param scene {Scene}
     */
    function Focus(scene) {
        activeIndex.value = IndexOfScenes(scene)
        if (activeIndex.value < 0) return;
        unmountAll();
        root.add(scenes[activeIndex.value]);
        isFocus.value = true;
    }

    /**
     * 取消聚焦子场景
     */
    function Blur() {
        if (!isFocus.value) return;
        mountAll();
        isFocus.value = false;
    }

    /**
     * 获取当前子场景索引
     * @param scene {Scene}
     * @returns {number}
     * @constructor
     */
    function IndexOfScenes(scene) {
        let index = -1
        if (typeof scene === 'object' && scene.type === "Scene") {
            index = scenes.indexOf(scene);
        } else if (typeof scene === "string") {
            index = scenes.findIndex(item => item.name === scene);
        } else if (typeof scene === "number" && scene < scenes.length) {
            index = scene;
        }
        return index
    }

    /**
     * 获取场景对象
     * @param scene
     * @constructor
     */
    function GetScene(scene) {
        let index = IndexOfScenes(scene)
        if (index >= 0) {
            return scenes[index]
        } else {
            return null
        }
    }

    /**
     * 获取当前激活的场景
     * @returns {*|Scene}
     * @constructor
     */
    const GetActiveScene = computed(() => {
        if (activeIndex.value >= 0) {
            return scenes[activeIndex.value]
        } else {
            return root
        }
    })

    return {root, Add, Remove, Focus, Blur, IndexOfScenes, GetScene, GetActiveScene}
}
