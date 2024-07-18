import {inject, watch} from "vue";
import {layerEmits, layerProps, useLayer,} from "../use/useLayer";
import {transformEmits, transformProps, useTransform} from "../use/useTransform";

const object3dEmits = () => {
    return [
        ...layerEmits,
        ...transformEmits
    ]
}
const object3dProps = () => {
    return {
        ...layerProps,
        ...transformProps,
        name: {type: String, default: ''},
        visible: {type: Boolean, default: true},
    }
}

/**
 * 初始化对象节点设置
 * @param object3d
 * @param props
 * @param emits
 */
function useObject3d(object3d, props, emits) {
    const stage = inject('stage')
    const parent = inject('parent')

    object3d.isVue3d ??= true
    object3d.name = props.name

    const {setLayer, setChildLayer} = useLayer(object3d, props, emits)
    const {position, scale, angle} = useTransform(object3d, props, emits)

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
        position, scale, angle // transform
    }
}

export {object3dProps, object3dEmits, useObject3d}
