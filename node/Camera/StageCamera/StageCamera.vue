<script setup>
import {inject, reactive, toRaw, watch} from "vue";
import {CameraHelper, PerspectiveCamera, Vector4} from "three";
import {object3dEmits, object3dProps, useObject3d} from "vue3d/use";
import {transformControlEmits, transformControlProps, useTransformControl} from "../useTransformControl";
import {raycasterEmits, raycasterProps, useRaycaster} from "../useRaycaster";
import {pluginEmits, pluginProps, usePlugin} from "vue3d/use";
import {ComponentName} from "./index"
import {useOrbitControl} from "../useOrbitControl";

const emits = defineEmits([
  ...object3dEmits,
  ...transformControlEmits,
  ...pluginEmits,
  ...raycasterEmits])

const props = defineProps({
  ...object3dProps,
  ...pluginProps,
  ...transformControlProps,
  ...raycasterProps,
  x: {type: Number, default: 0}, // viewport x 原点（x=0）：左
  y: {type: Number, default: 0}, // viewport y 原点（y=0）：下
  width: {type: Number}, // viewport width
  height: {type: Number}, // viewport height
  near: {type: Number, default: 0.1},
  far: {type: Number, default: 2000},
  fov: {type: Number, default: 50},
  /* helper */
  withHelper: {type: Boolean, default: false},
  visibleHelper: {type: Boolean, default: false},
  main: {type: Boolean, default: false},
})

const stage = inject('stage')
const parent = inject('parent')

const vWidth = stage.width.value
const vHeight = stage.height.value

const viewport = reactive({
  width: props.width ? props.width : vWidth,
  height: props.height ? props.height : vHeight
})

const camera = reactive(new PerspectiveCamera(props.fov, viewport.width / viewport.height, props.near, props.far))

const updateCamera = () => {
  camera.fov = props.fov;
  camera.aspect = viewport.width / viewport.height
  camera.viewport = new Vector4(Math.floor(props.x), Math.floor(props.y), Math.ceil(viewport.width), Math.ceil(viewport.height))
  camera.updateProjectionMatrix();
  stage.render()
}

if (props.withHelper) {
  const helper = new CameraHelper(camera);
  helper.visible = props.visibleHelper;
  camera.helper = helper;
  stage.root.add(helper)
}

watch([() => props.width, () => props.height, () => vWidth, () => vHeight, () => props.fov], () => {
  viewport.width = props.width ? props.width : vWidth
  viewport.height = props.height ? props.height : vHeight
  updateCamera()
}, {immediate: true})

// 初始化
const {status} = useObject3d(camera, props, emits)
const {} = useRaycaster(camera, props, emits)
const {tfControl} = useTransformControl(camera, props, emits)
const {orbit} = useOrbitControl(camera, props, emits)
usePlugin(camera, props, emits)

tfControl.addEventListener('dragging-changed', function (event) {
  orbit.enabled = !event.value;
});

if (props.main) {
  parent.mainCamera = toRaw(camera)
}

parent.add(camera, ComponentName, props.uuid)
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>

