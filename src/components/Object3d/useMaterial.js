import {ceramic} from "../../materials";
import {watch} from "vue";
import {SRGBColorSpace, TextureLoader} from "three";

export function useMaterial(object3d, props, emits) {
    const setMaterial = (material) => {
        if (object3d && material) {
            object3d.material = material;
            object3d.traverse((child) => {
                if (child.name === object3d.uuid) {
                    child.material = material;
                }
            });
        }
    }
    // setMaterial(props.material)
    watch(() => props.material, () => {
        setMaterial(props.material)
        emits("render")
    }, {immediate: true})

    watch(() => props.map, () => {
        if (props.map) {
            if (typeof props.map === 'object') {
                props.material.map = props.map
                emits("render")
            } else if (typeof props.map === 'string') {
                props.material.map = new TextureLoader().load(props.map, (texture) => {
                    texture.colorSpace = SRGBColorSpace;
                    emits("render")
                });
            }
        }
    }, {immediate: true})

    return {setMaterial}
}

export const materialEmits = ['render']
export const materialProps = {
    material: {
        type: Object, default() {
            return ceramic()
        }
    },
    map: {type: [Object, String]},
}

