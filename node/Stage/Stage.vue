<script setup>
import {onMounted, provide, ref, watch} from "vue";
import {rendererEmits, rendererProps, useRenderer} from "../../use/useRenderer"
import {nodeEmits, nodeProps, useStageNode} from "../../mixins/useNode"

const emits = defineEmits([
  ...rendererEmits,
  ...nodeEmits,
])

const props = defineProps({
  ...rendererProps,
  ...nodeProps,
  dataEngine: {type: String, default: null}, // Canvas Dom data-engine attribute
  play: {type: String, default: null}, // Play with scene
})

// refs dom
const canvas = ref(null)

const renderer = useRenderer(canvas, props, emits)
const {status, stage} = useStageNode(undefined, props, emits)

const setActive = (scene) => {
  stage.setActive(scene)
  renderer.bindNode(scene)
}

onMounted(() => {
  stage.dom = canvas.value
  stage.renderer = renderer
  stage.render = renderer.render

  if (props.dataEngine) {
    stage.dom.setAttribute('data-engine', props.dataEngine)
  } else {
    stage.dom.removeAttribute('data-engine')
  }

  renderer.render()
})

watch(() => props.play, (val) => {
  if (val) {
    setActive(val)
  } else {
    renderer.bindNode(stage)
  }
  renderer.render()
}, {immediate: true})

provide('stage', stage)
provide('scene', stage.scene)

/** Expose **/
defineExpose({...stage, setActive})
</script>

<template>
  <canvas :id="uuid" ref="canvas" :width="width" :height="height">
    <slot v-if="status.mounted"></slot>
    Sorry, your web browser does not support {{ mode }}
  </canvas>
</template>

