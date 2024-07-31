export * from "three"

/** node:Stage 舞台 **/
import {V3dStage, StageName} from "./node/Stage"
/** node:Scene 子场景 **/
import {V3dScene, SceneName} from "./node/Scene"
/** node:Group **/
import {V3dGroup, GroupName} from "./node/Group"
/** node:Camera **/
// export {V3dThreeViewCamera} from "./Camera/ThreeViewCamera"
import {V3dPerspectiveCamera, PerspectiveCameraName} from "./node/Camera/PerspectiveCamera"
/** node:Light **/
import {V3dAmbientLight, AmbientLightName} from "./node/Light/AmbientLight"
import {V3dDirectionalLight, DirectionalLightName} from "./node/Light/DirectionalLight"
/** node:Loader **/
import {V3dAdaptLoader, AdaptLoaderName} from "./node/Loader/AdaptLoader" // 加载器适配器：异步调用已适配格式的加载器
import {V3dObjLoader, ObjLoaderName} from "./node/Loader/ObjLoader" // OBJ格式
import {V3dErrLoaded, ErrLoadedName} from "./node/Loader/ErrLoaded" // 错误加载
/** node:Geom **/
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
        App.use(V3dAdaptLoader)
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
    V3dAdaptLoader, V3dObjLoader, V3dErrLoaded,
    V3dCube, V3dSphere, V3dLathe,
    V3dCameraOrbitControl,
    V3dCameraRaycaster,
    V3dCameraTransformControl,
    V3dGridHelper
}
