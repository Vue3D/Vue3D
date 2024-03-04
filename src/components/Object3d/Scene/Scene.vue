<script setup>
import {inject} from "vue";
import {Scene} from "three";
import {object3dEmits, object3dProps, useObject3d} from "../useObject3d";
import {ComponentName} from "./index";

const emits = defineEmits([...object3dEmits])
const props = defineProps({
  ...object3dProps,
  v3dComponent: "V3dScene",
})
const stage = inject('stage')
const parent = inject('parent')

/** start **/
const scene = new Scene()

parent.addScene(scene, ComponentName, props.uuid)
const {status} = useObject3d(scene, props, emits)

/** Expose **/
defineExpose({scene})

</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
