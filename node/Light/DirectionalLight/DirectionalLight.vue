<script setup>
import {DirectionalLight, DirectionalLightHelper} from 'three'
import {reactive} from "vue";
import {object3dEmits, object3dProps, useObject3d} from "../../../use/mixins/useObject3D";
import {nodeEmits, nodeProps, useNode} from "../../../use/mixins/useNode";
import {DirectionalLightName} from "./index";

const props = defineProps({
  ...object3dProps,
  ...nodeProps,
  color: {type: String, default: 'rgb(255,255,255)'},
  intensity: {type: Number, default: 1.0},
  withHelper: {type: Boolean, default: true},
  visibleHelper: {type: Boolean, default: false},
})

const emits = defineEmits([
  ...object3dEmits,
  ...nodeEmits
])

const light = reactive(new DirectionalLight(props.color, props.intensity))

const {status, node} = useNode(light, props, emits, DirectionalLightName)
const {} = useObject3d(light, props, emits)

if (props.withHelper) {
  const helper = new DirectionalLightHelper(light);
  helper.visible = props.visibleHelper;
  light.helper = helper;
  light.add(helper)
}

defineExpose({node: node})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
