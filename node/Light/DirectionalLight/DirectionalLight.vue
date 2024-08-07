<script setup>
import {DirectionalLight, DirectionalLightHelper} from 'three'
import {reactive, watchEffect} from "vue";
import {nodeEmits, nodeProps, useNode} from "../../../mixins/useNode"
import {object3dEmits, object3dProps, useObject3d} from "../../../mixins/useObject3D"
import {DirectionalLightName} from "./index";

defineOptions({
  inheritAttrs: false
})
const emits = defineEmits([...object3dEmits, ...nodeEmits])
const props = defineProps({
  ...object3dProps,
  ...nodeProps,
  color: {type: String, default: 'rgb(255,255,255)'},
  intensity: {type: Number, default: 1.0},
  withHelper: {type: Boolean, default: true},
  visibleHelper: {type: Boolean, default: false},
})

const light = reactive(new DirectionalLight(props.color, props.intensity))

const {status, node} = useNode(light, props, emits, DirectionalLightName)
const {} = useObject3d(light, props, emits)

watchEffect(() => props.color, () => {
  light.color = props.color
})

watchEffect(() => props.intensity, () => {
  light.intensity = props.intensity
})

if (props.withHelper) {
  const helper = new DirectionalLightHelper(light);
  helper.visible = props.visibleHelper;
  light.helper = helper;
  light.add(helper)
}

defineExpose({...node})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
