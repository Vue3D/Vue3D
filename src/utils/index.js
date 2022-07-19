import * as THREE from 'three'

/**
 * 通过外包盒获取对象尺寸
 * @returns {*}
 */
export const getObjectSize = () => {
    const box = new THREE.Box3();
    box.setFromObject(object);
    return box.getSize(object);
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