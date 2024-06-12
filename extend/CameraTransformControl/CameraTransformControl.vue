<script setup>
import {extendEmits, extendProps, useExtend} from "../../mixins/useExtend";
import {transformControlEmits, transformControlProps, useTransformControl} from "../../use"
import {TransformControlName} from "./";
import {inject, onMounted} from "vue";


const props = defineProps({
  ...extendProps,
  ...transformControlProps
})
const emits = defineEmits([
  ...extendEmits,
  ...transformControlEmits
])

const stage = inject("stage")
const parent = inject("parent")
const scene = inject("scene")

if (parent.obj3.isCamera) {
  const {tfControl} = useTransformControl(parent.obj3, props, emits)
  const {extend} = useExtend(tfControl, props, emits, TransformControlName)

  onMounted(() => {
    scene.add(tfControl)
  })
} else {
  console.error("The current parent component is not a camera component")
}


</script>

<template></template>

