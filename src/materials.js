import {Color, DoubleSide, MeshPhongMaterial, MeshStandardMaterial} from 'three'

export const ceramic = () => {
    return new MeshPhongMaterial({
        specular: 0x333333,
        emissive: 0x000000,
        reflectivity: 1,
        shininess: 4096,
        side: DoubleSide,
    })
}

export const ceramic01 = () => {
    return new MeshStandardMaterial({
        specular: new Color("#ffffff"),
        emissive: new Color("#000000"),
        roughness: 0,
        matelness: 0.275,
    })
}
