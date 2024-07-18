import {watch} from "vue";
import {DoubleSide, MeshPhongMaterial, SRGBColorSpace, TextureLoader} from "three";

const materialEmits = ['render']
const materialProps = {
    material: {
        type: Object, default() {
            return defaultMaterial()
        }
    },
    map: {type: [Object, String]},
}

const defaultMaterial = () => {
    return new MeshPhongMaterial({
        specular: 0x333333,
        emissive: 0x000000,
        reflectivity: 1,
        shininess: 4096,
        side: DoubleSide,
    })
}

function useMaterial(object3d, props, emits) {
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

export {materialEmits, materialProps, useMaterial, defaultMaterial}
