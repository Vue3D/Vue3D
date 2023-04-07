export default function useLayers(object3d, layer) {
    /**
     * 设置对象所在图层
     * @param layer [0-31] 当前对象所在的图层。可以为数组，表示同时处在多个图层中
     */
    const setLayer = (layer) => {
        if (!layer) return
        if (Array.isArray(layer)) {
            object3d.layers.disableAll()
            for (let l of layer) {
                object3d.layers.enable(l)
            }
        } else {
            object3d.layers.set(layer)
        }
    }

    setLayer(layer)

    return {setLayer}
}

export const layersProps = {
    layer: {
        type: [Number, Array], default: 0, validator(value) {
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

