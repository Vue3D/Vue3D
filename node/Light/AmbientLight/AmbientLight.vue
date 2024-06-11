<script setup>
import {AmbientLight} from 'three'
import {reactive} from "vue";
import {object3dEmits, object3dProps, useObject3d} from "../../../mixins/useObject3D";
import {nodeEmits, nodeProps, useNode} from "../../../mixins/useNode";
import {AmbientLightName} from "./index";

const props = defineProps({
  ...object3dProps,
  ...nodeProps,
  color: {type: String, default: 'rgb(255,255,255)'},
  intensity: {type: Number, default: 1.0},
})

const emits = defineEmits([
  ...nodeEmits,
  ...object3dEmits
])

//
const light = reactive(new AmbientLight(props.color, props.intensity))

const {status, node} = useNode(light, props, emits, AmbientLightName)
const {} = useObject3d(light, props, emits)

defineExpose({node: node})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>

