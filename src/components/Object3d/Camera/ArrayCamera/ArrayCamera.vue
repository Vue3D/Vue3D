<script setup>
import {defineProps, inject, markRaw, reactive, ref, toRaw, watch} from "vue"
import {transformProps} from "../../useTransform";
import {ArrayCamera, CameraHelper, Vector4} from "three";

const parent = inject('parent')
const stage = inject('stage')

const props = defineProps({
  ...transformProps,
})

// 数据节点
const data = markRaw({
  node: null
})
const process = reactive({
  mounted: false, // 挂载完成
  loaded: false, // 加载完成
})
const vWidth = inject('width')
const vHeight = inject('height')

const viewport = reactive({
  width: props.width ? props.width : vWidth.value,
  height: props.height ? props.height : vHeight.value
})

const camera = reactive(new ArrayCamera([]))

/**
 * 在父节点上挂载
 * @param camera
 */
const mount = (camera) => {
  if (parent.node) {
    parent.node?.add(toRaw(camera));
  }
  stage.render()
}
/**
 * 在父节点上卸载
 * @param camera
 */
const unmount = (camera) => {
  if (parent.node) {
    parent.node?.remove(toRaw(camera));
  }
  stage.render()
}

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
  stage.scene.add(helper)
}

watch([() => props.width, () => props.height, () => vWidth.value, () => vHeight.value, () => props.fov], () => {
  viewport.width = props.width ? props.width : vWidth.value
  viewport.height = props.height ? props.height : vHeight.value
  updateCamera()
}, {immediate: true})

props.main && (stage.camera = toRaw(camera))

defineExpose({
  process, viewport, updateCamera
})
</script>

<template>
  <slot v-if="process.mounted"></slot>
</template>
