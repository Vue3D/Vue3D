import {defineExpose, inject, watch} from "vue";
import {lifecycleEmits, lifecycleProps, useLifecycle} from "../useLifecycle";
import {layerEmits, layerProps, useLayer} from "./useLayer";
import {transformEmits, transformProps, useTransform} from "./useTransform";

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

    const {status} = useLifecycle(object3d, props, emits)
    const {setLayer, setChildLayer} = useLayer(object3d, props, emits)
    const {setPosition, setRotation, setScale, setTarget} = useTransform(object3d, props, emits)

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
        status, // lifecycle
        setLayer, setChildLayer, //layer
        setPosition, setRotation, setScale, setTarget, // transform
    }
}

export const object3dEmits = [...lifecycleEmits, ...layerEmits, ...transformEmits]
export const object3dProps = {
    ...lifecycleProps,
    ...layerProps,
    ...transformProps,
    name: {type: String, default: ''},
    visible: {type: Boolean, default: true},
}
