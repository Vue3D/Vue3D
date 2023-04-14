import {MeshPhongMaterial} from 'three'

export const ceramic = () => {
    return new MeshPhongMaterial({
        color: 0xffffff,
        bumpScale: 1,
        // roughness: 0,
        reflectivity: 1,
        shininess: Math.pow(2, 10),
    })
}
