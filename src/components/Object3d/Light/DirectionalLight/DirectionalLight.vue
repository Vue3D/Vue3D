<script setup>
import {DirectionalLight, DirectionalLightHelper} from 'three'
import {reactive} from "vue";
import {object3dEmits, object3dProps, useObject3d} from "../../useObject3d";
import {transformEmits, transformProps, useTransform} from "../../useTransform";

const props = defineProps({
  ...object3dProps,
  ...transformProps,
  color: {type: String, default: 'rgb(255,255,255)'},
  intensity: {type: Number, default: 1.0},
  withHelper: {type: Boolean, default: true},
  visibleHelper: {type: Boolean, default: false},
})

const emits = [...transformEmits, ...object3dEmits]
const light = reactive(new DirectionalLight(props.color, props.intensity))

const {status, data} = useObject3d(light, props, emits)
useTransform(light, props, emits)

if (props.withHelper) {
  const helper = new DirectionalLightHelper(light);
  helper.visible = props.visibleHelper;
  light.helper = helper;
  light.add(helper)
}
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
