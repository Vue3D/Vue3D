<script setup>
import {nodeEmits, nodeProps, useSceneNode} from "../../mixins/useNode"
import {object3dEmits, object3dProps, useObject3d} from "../../mixins/useObject3D"
import {SceneName} from "./index";

defineOptions({
  inheritAttrs: false
})
const emits = defineEmits([...object3dEmits, ...nodeEmits])
const props = defineProps({
  ...object3dProps,
  ...nodeProps
})

const {status, node, scene} = useSceneNode(undefined, props, emits)
/** start **/
const {} = useObject3d(scene, props, emits, SceneName)

/** Provide */
// provide('scene', scene)
// provide('parent', node)

/** Expose **/
defineExpose({...node})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
