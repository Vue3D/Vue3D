import {Camera, Scene} from "three";
import {ref} from "vue";

export function useScenesManager() {
    const root = new Scene()
    const index = ref(-1)
    const children = []
    let camera = null

    /**
     * 添加一个场景
     * @param scene {Scene} 场景
     * @param camera {Camera} 主摄像机
     * @returns {number} 索引号
     */
    function add(scene, camera) {
        if (!Scene?.isScene || !camera?.isCamera) return -1
        children.push({scene, camera})
        root.add(scene)
        return children.length - 1
    }

    /**
     * 更换指定场景的摄像机
     * @param cam {Camera}
     * @param i {number=}-1
     */
    function changeCamera(cam, i = -1) {
        if (!cam || !cam.isCamera) return
        if (i < 0) {
            camera = cam
        } else {
            children[index].camera = cam
        }
    }

    /**
     * 获取根节点的场景和摄像机
     * @returns {{camera: null, scene: Scene}}
     */
    function getBase() {
        return {scene: root, camera}
    }

    /**
     * 设置当前激活的场景
     * @param i {number}
     */
    function setActivated(i) {
        if (i.value >= 0 && i.value < children.length) {
            index.value = i
        }
    }

    /**
     * 当前激活的场景和该场景的主摄像机
     * @returns {{camera: null, scene: Scene}|{camera, scene}}
     */
    function getActivated() {
        if (index.value >= 0) {
            return {scene: children.scene, camera: children.camera}
        } else {
            return getBase
        }
    }

    return {add, changeCamera, getBase, getActivated, setActivated}
}
