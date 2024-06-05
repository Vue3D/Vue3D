<script setup>
import {AmbientLight} from 'three'
import {inject, reactive} from "vue";
import {object3dEmits, object3dProps, useObject3d} from "@vue3d/core";
import {ComponentName} from "./index"

const props = defineProps({
  ...object3dProps,
  color: {type: String, default: 'rgb(255,255,255)'},
  intensity: {type: Number, default: 1.0},
})

const emits = defineEmits([...object3dEmits])

const parent = inject('parent')
const light = reactive(new AmbientLight(props.color, props.intensity))

const {status} = useObject3d(light, props, emits)

parent.add(light, ComponentName, props.uuid)
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>

