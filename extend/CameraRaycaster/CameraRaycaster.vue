<script setup>
import {extendEmits, extendProps, useExtend} from "../../mixins";
import {raycasterEmits, raycasterProps, useRaycaster} from "../../use";
import {inject, onMounted} from "vue";
import {RaycasterName} from "./index";

const props = defineProps({
  ...raycasterProps,
  ...extendProps
})

const emits = defineEmits([
  ...raycasterEmits,
  ...extendEmits
])

const stage = inject("stage")
const parent = inject("parent")
const scene = inject("scene")

if (parent.obj3.isCamera) {
  const {raycaster} = useRaycaster(parent.obj3, props, emits)
  const {extend} = useExtend(raycaster, props, emits, RaycasterName)

  onMounted(() => {
    // scene.add(tfControl)
  })

} else {
  console.error("The current parent component is not a camera component")
}
</script>

<template></template>
