<script setup>
import {inject, provide} from "vue";
import {object3dEmits, object3dProps, useObject3d} from "@vue3d/core";
import {ComponentName} from "./index";

const emits = defineEmits([...object3dEmits])
const props = defineProps({
  ...object3dProps,
})

const root = inject('root')

/** start **/
const {scene, node} = root.addScene(scene, ComponentName, props.uuid)
const {status} = useObject3d(scene, props, emits)

/** Provide */
provide('scene', scene)
provide('parent', node)

/** Expose **/
defineExpose({scene})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
