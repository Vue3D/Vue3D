<script setup>
import {inject, toRaw, watch} from "vue";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {useHelper} from "../../mixins/useHelper";

const props = defineProps({
  autoRotate: {type: Boolean, default: false},
})
const emits = defineEmits([])

const stage = inject("stage")
const parent = inject("parent")

if (!parent.obj3.isCamera) {
  console.error("The current parent component is not a camera component")
}

const orbit = new OrbitControls(toRaw(parent.obj3), stage.dom)
const {} = useHelper(orbit, props, emits)

watch(() => props.autoRotate, (val) => {
  if (props.autoRotate > 0) {
    orbit.autoRotate = true
    orbit.autoRotateSpeed = props.autoRotate
  }
}, {immediate: true})

orbit.addEventListener("change", stage.render, true)

stage.renderer.renderCall(next => {
  console.log(stage)
  next()
  orbit.update()
})
</script>

<template></template>

