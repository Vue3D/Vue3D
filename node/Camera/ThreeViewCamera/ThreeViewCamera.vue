<script setup>
import {computed, inject, reactive, toRaw} from "vue"
import {ArrayCamera, OrthographicCamera, PerspectiveCamera, Vector4} from "three";
import {object3dEmits, object3dProps, useObject3d} from "../../../mixins/useObject3D";
import {transformControlEmits, transformControlProps, useTransformControl} from "../../../use/useTransformControl";
import {orbitControlEmits, orbitControlProps, useOrbitControl,} from "../../../use/useOrbitControl";

const stage = inject('stage')
const parent = inject('parent')

const emits = defineEmits([...object3dEmits, ...transformControlEmits, ...orbitControlEmits])
const props = defineProps({
  ...object3dProps,
  ...transformControlProps,
  ...orbitControlProps,
  near: {type: Number, default: 0.1},
  far: {type: Number, default: 2000},
  fov: {type: Number, default: 50},
  frustum: {type: Number, default: 2},
  main: {type: Boolean, default: false}
})

const aspect = computed(() => {
  return stage.width.value / stage.height.value
})

const viewport = {
  x: Math.floor(stage.width.value / 2),
  y: Math.floor(stage.height.value / 2),
  width: Math.ceil(stage.width.value / 2),
  height: Math.ceil(stage.height.value / 2)
}

// 顶视图
const tCamera = new OrthographicCamera(-props.frustum, props.frustum, -props.frustum, props.frustum, props.near, props.far)
tCamera.viewport = new Vector4(0, viewport.y, viewport.width, viewport.height)
tCamera.position.set(0, 10, 0)
tCamera.lookAt(0, 0, 0)
tCamera.updateMatrixWorld()

// 左视图
const lCamera = new OrthographicCamera(-props.frustum, props.frustum, -props.frustum, props.frustum, props.near, props.far)
// lCamera.setViewOffset(stage.width.value, stage.height.value, stage.width.value / 2, 0, stage.width.value / 2, stage.height.value / 2)
lCamera.viewport = new Vector4(0, 0, viewport.width, viewport.height)
lCamera.position.set(-10, 0, 0)
lCamera.lookAt(0, 0, 0)
lCamera.updateMatrixWorld()

// 前视图
const fCamera = new OrthographicCamera(-props.frustum, props.frustum, -props.frustum, props.frustum, props.near, props.far)
fCamera.viewport = new Vector4(viewport.x, viewport.y, viewport.width, viewport.height);
fCamera.position.set(0, 0, 10)
fCamera.lookAt(0, 0, 0)
fCamera.updateMatrixWorld()

// 编辑视图
const sCamera = new PerspectiveCamera(props.fov, aspect.value, props.near, props.far)
sCamera.viewport = new Vector4(viewport.x, 0, viewport.width, viewport.height);
sCamera.position.set(0, 0, 10)

const camera = reactive(new ArrayCamera([tCamera, lCamera, fCamera, sCamera]))

const {tfControl} = useTransformControl(sCamera, props, emits)
const {orbit} = useOrbitControl(sCamera, props, emits)

tfControl.addEventListener('dragging-changed', function (event) {
  orbit.enabled = !event.value;
});

stage.renderer.onRender(next => {
  next()
  updateCamera()
})

const {status} = useObject3d(camera, props, emits)

const updateCamera = () => {
  stage.render()
}

if (props.main) {
  parent.mainCamera = toRaw(camera)
}
stage.render()

parent.add(camera)
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
