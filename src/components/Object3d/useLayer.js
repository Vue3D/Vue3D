import {watch} from "vue";

export function useLayer(object3d, props, emits) {
    /**
     * 设置图层
     * @param layer
     */
    const setLayer = (layer) => {
        object3d.layers.disableAll()
        if (!layer) {
            object3d.layers.enableAll()
            return
        }
        if (Array.isArray(layer)) {
            for (let i of layer) {
                object3d.layers.enable(i)
            }
        } else {
            object3d.layers.enable(layer)
        }
    }

    /**
     * 设置子对象图层
     */
    const setChildLayer = () => {
        object3d.children.forEach(child => {
            child.layers.disableAll()
            if (!props.layer) {
                child.layers.enableAll()
                return
            }
            if (Array.isArray(props.layer)) {
                for (let i of props.layer) {
                    child.layers.enable(i)
                }
            } else {
                child.layers.enable(props.layer)
            }
        })
    }

    watch(() => props.layer, (val) => {
        setLayer(val)
    }, {immediate: true})

    return {setLayer, setChildLayer}
}

export const layerEmits = []
export const layerProps = {
    layer: {
        type: [Number, Array], validator(value) {
            if (Array.isArray(value)) {
                for (let item of value) {
                    if (!test(item)) return false
                }
                return true
            } else {
                return test(value)
            }

            function test(val) {
                return val >= 0 || val < 32
            }
        }
    },
}
