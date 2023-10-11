import {ceramic} from "../../const/materials";
import {watch} from "vue";
import {RepeatWrapping, SRGBColorSpace, TextureLoader} from "three";

export function useMaterial(object3d, props, ctx) {
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
        ctx.emit("render")
    }, {immediate: true})

    watch(() => props.map, () => {
        if (props.map) {
            if (typeof props.map === 'object') {
                props.material.map = props.map
                ctx.emit("render")
            } else if (typeof props.map === 'string') {
                props.material.map = new TextureLoader().load(props.map, (texture) => {
                    texture.colorSpace = SRGBColorSpace;
                    ctx.emit("render")
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

