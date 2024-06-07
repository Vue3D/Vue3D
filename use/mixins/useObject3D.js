import {inject, watch} from "vue";
import {layerEmits, layerProps, useLayer} from "../useLayer";
import {transformEmits, transformProps, useTransform} from "../useTransform";

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
    const {setPosition, setRotation, setScale} = useTransform(object3d, props, emits)

    /**
     * 设置是否可见
     * @param visible
     */
    const setVisible = (visible) => {
        visible = !!visible
        object3d.visible = visible
        stage.render()
    }

    watch(() => props.visible, (val) => {
        setVisible(val)
    }, {immediate: true})

    return {
        setVisible,
        setLayer, setChildLayer, //layer
        setPosition, setRotation, setScale  // transform
    }
}

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
