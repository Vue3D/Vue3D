<script setup>
import {computed, markRaw, onMounted, provide, ref, watch} from "vue";
import {createRoot} from "../Object3d/useNode"
import {lifecycleEmits, lifecycleProps, useLifecycle} from "../useLifecycle";
import {rendererEmits, rendererProps, useRenderer} from "./useRenderer";
import {noop} from "@unjuanable/jokes";
import {ComponentName} from "../Object3d/Scene";

const emits = defineEmits([
  ...rendererEmits,
  ...lifecycleEmits,
])

const props = defineProps({
  ...rendererProps,
  ...lifecycleProps,
  dataEngine: {type: String, default: null}, // Canvas Dom data-engine attribute
  play: {type: String, default: null}, // Play with scene
})

const canvas = ref(null) // 获取 Canvas DOM

const {scene, root} = createRoot(ComponentName, props.uuid)

const stage = markRaw({
  uuid: props.uuid,
  dom: null, // Canvas DOM
  root,
  render: noop(), // 渲染函数
  renderer: null, // 渲染器
  width: computed(() => {
    return props.width
  }),
  height: computed(() => {
    return props.height
  })
})

const life = useLifecycle(stage, props, emits)
const renderer = useRenderer(canvas, props, emits)

onMounted(() => {
  stage.dom = canvas.value
  stage.renderer = renderer
  stage.render = renderer.render

  if (props.dataEngine) {
    stage.dom.setAttribute('data-engine', props.dataEngine)
  } else {
    stage.dom.removeAttribute('data-engine')
  }

  // Command
  renderer.render()
})

watch(() => props.play, (val) => {
  if (val) {
  } else {
    renderer.bind(root)
    renderer.render()
  }
}, {immediate: true})

/** Expose **/
defineExpose(stage)

provide('stage', stage)
</script>

<template>
  <canvas :id="uuid" ref="canvas" :width="width" :height="height">
    <slot v-if="life.status.mounted"></slot>
    Sorry, your web browser does not support {{ mode }}
  </canvas>
</template>

