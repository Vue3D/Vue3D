<script setup>
import {computed, markRaw, onMounted, provide, ref, watch} from "vue";
import {lifecycleEmits, lifecycleProps, useLifecycle} from "vue3d/use"
import {rendererEmits, rendererProps, useRenderer} from "@vue3d/core/use/useRenderer";
import {pluginEmits, pluginProps, usePlugin} from "@vue3d/core/use/usePlugin"
import {createRoot} from "@vue3d/core/libs/node.class"
import {ComponentName} from "./index";

const emits = defineEmits([
  ...rendererEmits,
  ...lifecycleEmits,
  ...pluginEmits,
])

const props = defineProps({
  ...rendererProps,
  ...lifecycleProps,
  ...pluginProps,
  dataEngine: {type: String, default: null}, // Canvas Dom data-engine attribute
  play: {type: String, default: null}, // Play with scene
})

const canvas = ref(null) // 获取 Canvas DOM

const {root, scene} = createRoot(props.uuid, ComponentName)

const stage = markRaw({
  uuid: props.uuid,
  dom: null, // Canvas DOM
  root,
  render: Function.prototype,
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
const plugin = usePlugin(scene, props, emits)
usePlugins()

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
    renderer.bindNode(root)
    renderer.render()
  }
}, {immediate: true})

provide('stage', stage)

/** Expose **/
defineExpose(stage)
</script>

<template>
  <canvas :id="uuid" ref="canvas" :width="width" :height="height">
    <slot name="default" v-if="life.status.mounted"></slot>
    <slot name="helper" v-if="life.status.mounted"></slot>
    Sorry, your web browser does not support {{ mode }}
  </canvas>
</template>

