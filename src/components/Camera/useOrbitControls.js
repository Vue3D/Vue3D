import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export default function useOrbitControls(camera, dom) {
    const orbit = new OrbitControls(camera, dom)
    
    return {orbit}
}
