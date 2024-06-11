<script setup>
import {object3dEmits, object3dProps} from "../../mixins/useObject3D";
import {nodeEmits, nodeProps, useSceneNode} from "../../mixins/useNode";

const emits = defineEmits([
  ...object3dEmits,
  ...nodeEmits
])
const props = defineProps({
  ...object3dProps,
  ...nodeProps,
})

const {status} = useSceneNode(undefined, props, emits)
/** start **/
// const {scene, node} = root.addScene(scene, ComponentName, props.uuid)
// const {status} = useObject3d(scene, props, emits)

/** Provide */
// provide('scene', scene)
// provide('parent', node)

/** Expose **/
// defineExpose({scene})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
