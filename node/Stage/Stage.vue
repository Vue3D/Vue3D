<script setup>
import {onMounted, provide, ref, watch} from "vue";
import {rendererEmits, rendererProps, useRenderer} from "../../use"
import {nodeEmits, nodeProps, useStageNode} from "../../use/mixins/useNode"

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
const {status, node} = useStageNode(undefined, props, emits)

onMounted(() => {
  node.dom = canvas.value
  node.renderer = renderer
  node.render = renderer.render

  if (props.dataEngine) {
    node.dom.setAttribute('data-engine', props.dataEngine)
  } else {
    node.dom.removeAttribute('data-engine')
  }

  renderer.render()
})

watch(() => props.play, (val) => {
  if (val) {

  } else {
    renderer.bindNode(node.scene)
    renderer.render()
  }
}, {immediate: true})

provide('stage', node)
provide('parent', node)
provide('scene', node.scene)

/** Expose **/
defineExpose(node)
</script>

<template>
  <canvas :id="uuid" ref="canvas" :width="width" :height="height">
    <slot v-if="status.mounted"></slot>
    Sorry, your web browser does not support {{ mode }}
  </canvas>
</template>

