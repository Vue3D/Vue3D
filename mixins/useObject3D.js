import {inject, watch} from "vue";
import Box3 from "../libs/Box3.class";
import {layerEmits, layerProps, useLayer} from "../use/useLayer";
import {transformEmits, transformProps, useTransform} from "../use/useTransform";

export const object3dEmits = [
    ...layerEmits,
    ...transformEmits
]
export const object3dProps = {
    ...layerProps,
    ...transformProps,
    name: {type: String, default: ''},
    visible: {type: Boolean, default: true},
}

export function useObject3d(object3d, props, emits) {
    const stage = inject('stage')
    const parent = inject('parent')

    /**
     * 初始化对象节点设置
     * @param object3d
     * @param props
     */
    object3d.isVue3d ??= true
    object3d.name = props.name

    const {setLayer, setChildLayer} = useLayer(object3d, props, emits)
    const {position, scale, angle, setScale} = useTransform(object3d, props, emits)

    /**
     * 设置是否可见
     * @param visible
     */
    const setVisible = (visible) => {
        visible = !!visible
        object3d.visible = visible
        stage.render()
    }

    /**
     * 通过外包盒设置大小
     * @param size
     */
    const setSize = (size) => {
        let box3 = new Box3(object3d)
        let nScale = box3.getContainedScale(size)
        setScale({x: nScale, y: nScale, z: nScale})
    }

    watch(() => props.visible, (val) => {
        setVisible(val)
    }, {immediate: true})

    return {
        setVisible, setSize,
        setLayer, setChildLayer, //layer
        position, scale, angle // transform
    }
}
