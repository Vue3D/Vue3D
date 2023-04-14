import {ceramic} from "../../const/materials";

export function useMaterial(object3d, props, ctx) {
    const setMaterial = (material) => {
        if (object3d && material) {
            object3d.material = material;
        }
    }
    setMaterial(props.material)

    return {setMaterial}
}

export const materialProps = {
    material: {
        type: Object, default() {
            return ceramic()
        }
    },
}

