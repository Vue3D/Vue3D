<script setup>
import {inject} from "vue";
import {extendEmits, extendProps, useExtend} from "../../mixins/useExtend";
import {orbitControlEmits, orbitControlProps, useOrbitControl} from "../../use/";
import {OrbitControlName} from './'

const props = defineProps({
  ...extendProps,
  ...orbitControlProps
})
const emits = defineEmits([
  ...extendEmits,
  ...orbitControlEmits
])

const stage = inject("stage")
const parent = inject("parent")

if (parent.obj3.isCamera) {
  const {orbit} = useOrbitControl(parent.obj3, props, emits)
  const {} = useExtend(orbit, props, emits, OrbitControlName)
} else {
  console.error("The current parent component is not a camera component")
}

</script>

<template></template>

