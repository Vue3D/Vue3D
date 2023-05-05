import {ceramic} from "../../const/materials";
import {watch} from "vue";

export function useMaterial(object3d, props, ctx) {
    const setMaterial = (material) => {
        if (object3d && material) {
            object3d.material = material;
        }
    }
    // setMaterial(props.material)
    watch(() => props.material, () => {
        setMaterial(props.material)
    }, {immediate: true})

    return {setMaterial}
}

export const materialProps = {
    material: {
        type: Object, default() {
            return ceramic()
        }
    },
}

