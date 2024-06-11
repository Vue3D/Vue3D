<script setup>
import {CameraHelper, PerspectiveCamera, Vector4} from 'three'
import {inject, reactive, toRaw, watch} from "vue";
import {nodeEmits, nodeProps, useNode} from "../../../use/mixins/useNode";
import {object3dEmits, object3dProps, useObject3d} from "../../../use/mixins/useObject3D";
import {PerspectiveCameraName} from "./";

const props = defineProps({
  ...nodeProps,
  ...object3dProps,
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
  main: {type: Boolean, default: false}
})

const emits = defineEmits([
  ...nodeEmits,
  ...object3dEmits
])

const stage = inject('stage')
const vWidth = stage.width
const vHeight = stage.height

const viewport = reactive({
  width: props.width ? props.width : vWidth.value,
  height: props.height ? props.height : vHeight.value
})

const camera = reactive(new PerspectiveCamera(props.fov, viewport.width / viewport.height, props.near, props.far))

const {status, node} = useNode(camera, props, emits, PerspectiveCameraName)
const {} = useObject3d(camera, props, emits)

const updateCamera = () => {
  camera.fov = props.fov;
  camera.aspect = viewport.width / viewport.height
  camera.viewport = new Vector4(Math.floor(props.x), Math.floor(props.y), Math.ceil(viewport.width), Math.ceil(viewport.height))
  camera.updateProjectionMatrix();
  stage.renderer.render()
}

if (props.withHelper) {
  const helper = new CameraHelper(camera);
  helper.visible = props.visibleHelper;
  camera.helper = helper;
  stage.root.add(helper)
}

watch([() => props.width, () => props.height, () => vWidth.value, () => vHeight.value, () => props.fov], () => {
  viewport.width = props.width ? props.width : vWidth.value
  viewport.height = props.height ? props.height : vHeight.value
  updateCamera()
}, {immediate: true})

// 初始化
// useRaycaster(camera, props, ctx)
// useControls(camera, props, ctx)
props.main && (stage.mainCamera = toRaw(camera))

defineExpose({node: node})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
