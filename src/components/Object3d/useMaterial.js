import {ceramic} from "../../const/materials";

export function useMaterial(object3d, material) {
    const setMaterial = (material) => {
        if (object3d && material) {
            object3d.material = material;
        }
    }
    setMaterial(material)

    return {setMaterial}
}

export const materialProps = {
    material: {
        type: Object, default() {
            return ceramic()
        }
    },
}

