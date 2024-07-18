<script setup>
import {extendEmits, extendProps, useExtend} from "../../mixins/useExtend";
import {raycasterEmits, raycasterProps, useRaycaster} from "../../use/useRaycaster";
import {inject, onMounted} from "vue";
import {RaycasterName} from "./index";

const emits = defineEmits([
  ...raycasterEmits,
  ...extendEmits
])
const props = defineProps({
  ...raycasterProps,
  ...extendProps
})

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
