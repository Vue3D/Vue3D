import {Euler, Vector3} from "three";

export const setObjectRotation = (obj, angle, callback = null) => {
    if (!obj) return
    if (angle && angle.hasOwnProperty('x') && angle.hasOwnProperty('y') && angle.hasOwnProperty('z')) {
        const x = angle2euler(angle.x);
        const y = angle2euler(angle.y);
        const z = angle2euler(angle.z);
        let euler = new Euler(x, y, z);
        obj.setRotationFromEuler(euler);
    }
    if (callback && typeof callback === 'function') {
        callback()
    }
}

/**
 * 夹角转欧拉角
 * @param angle
 * @returns {number}
 */
export const angle2euler = (angle) => {
    const euler = (angle % 360) / 180;
    return euler * Math.PI
}