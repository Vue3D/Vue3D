<script setup>
import {extendEmits, extendProps, useExtend} from "../../mixins";
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
  const {control, onChange} = useTransformControl(parent.obj3, props, emits)
  const {extend} = useExtend(control, props, emits, TransformControlName)

  onChange.callback = (e) => {
    emits("change", e)
  }

  onMounted(() => {
    scene.add(control)
    // 兼容Orbit组件
    const orbitNode = extend.parent.getByType("V3dCameraOrbitControl")
    if (orbitNode) {
      const orbit = orbitNode.obj3
      control.addEventListener('dragging-changed', function (event) {
        orbit.enabled = !event.value;
      });
    }
  })
} else {
  console.error("The current parent component is not a camera component")
}
</script>

<template></template>

