<script setup>
import {AmbientLight} from 'three'
import {reactive} from "vue";
import {nodeEmits, nodeProps, useNode} from "../../../mixins/useNode"
import {object3dEmits, object3dProps, useObject3d} from "../../../mixins/useObject3D"
import {AmbientLightName} from "./index";

defineOptions({
  inheritAttrs: false
})
const emits = defineEmits([...nodeEmits, ...object3dEmits])
const props = defineProps({
  ...object3dProps,
  ...nodeProps,
  color: {type: String, default: 'rgb(255,255,255)'},
  intensity: {type: Number, default: 1.0},
})

//
const light = reactive(new AmbientLight(props.color, props.intensity))

const {status, node} = useNode(light, props, emits, AmbientLightName)
const {} = useObject3d(light, props, emits)

defineExpose({...node})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>

