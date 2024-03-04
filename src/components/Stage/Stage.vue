<script setup>
import {computed, markRaw, onMounted, provide, ref} from "vue";
import {Scene} from "three";
import mitt from "mitt";
import {ev} from "../../event";
import {createNode} from "../useNode"
import {lifecycleEmits, lifecycleProps, useLifecycle} from "../useLifecycle";
import {rendererEmits, rendererProps, useRenderer} from "./useRenderer";
import {noop} from "@unjuanable/jokes";

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
const scene = new Scene() // 场景
const root = createNode(scene, "V3dStage", props.uuid)
console.log(scene)
scene.mainCamera = null

const stage = markRaw({
  uuid: props.uuid,
  dom: null, // Canvas DOM
  root,
  event: new mitt(), // 事件引擎
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

life.onLoading((next) => {
  stage.event.emit(ev.stage.response.loading)
  next()
  stage.event.emit(ev.stage.response.loaded)
})

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
  stage.event.on(ev.stage.command.render, renderer.render)
  stage.event.emit(ev.stage.mounted)

  renderer.render()
})

/** Expose **/
defineExpose({data: stage, renderer})

provide('stage', stage)
provide('scene', scene)
provide('parent', root)
</script>

<template>
  <canvas :id="uuid" ref="canvas" :width="width" :height="height">
    <slot v-if="life.status.mounted"></slot>
    Sorry, your web browser does not support {{ mode }}
  </canvas>
</template>

