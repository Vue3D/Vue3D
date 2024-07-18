export * from "three"
/**
 * node folder
 */
/** Stage 舞台 **/
import {V3dStage, StageName} from "./node/Stage"
/** Scene 子场景 **/
import {V3dScene, SceneName} from "./node/Scene"
/** Group **/
import {V3dGroup, GroupName} from "./node/Group"
/** Camera **/
// export {V3dThreeViewCamera} from "./Camera/ThreeViewCamera"
import {V3dPerspectiveCamera, PerspectiveCameraName} from "./node/Camera/PerspectiveCamera"
/** Light **/
import {V3dAmbientLight} from "./node/Light/AmbientLight"
import {V3dDirectionalLight} from "./node/Light/DirectionalLight"
/** Geom **/
import {V3dCube, CubeName, CubeGeom} from "./node/Geom/Cube"
import {V3dLathe, LatheName, LatheGeom} from "./node/Geom/Lathe"
import {V3dSphere, SphereName, SphereGeom} from "./node/Geom/Sphere"

/**
 * extend folder
 */
import {V3dCameraOrbitControl, OrbitControlName} from "./extend/CameraOrbitControl"
import {V3dCameraRaycaster, RaycasterName} from "./extend/CameraRaycaster"
import {V3dCameraTransformControl, TransformControlName} from "./extend/CameraTransformControl"
import {V3dGridHelper, GridHelperName} from "./extend/GridHelper"

export default {
    install: function (App) {
        App.use(V3dStage)
        App.use(V3dScene)
        App.use(V3dGroup)
        App.use(V3dPerspectiveCamera)
        App.use(V3dAmbientLight)
        App.use(V3dDirectionalLight)
        App.use(V3dCube)
        App.use(V3dLathe)
        App.use(V3dSphere)
        App.use(V3dCameraOrbitControl)
        App.use(V3dCameraRaycaster)
        App.use(V3dCameraTransformControl)
        App.use(V3dGridHelper)
    }
}

export {
    V3dStage,
    V3dScene,
    V3dGroup,
    V3dPerspectiveCamera,
    V3dAmbientLight, V3dDirectionalLight,
    V3dCube, V3dSphere, V3dLathe,
    V3dCameraOrbitControl,
    V3dCameraRaycaster,
    V3dCameraTransformControl,
    V3dGridHelper
}
