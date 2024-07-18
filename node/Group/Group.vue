<script setup>
import {nodeEmits, nodeProps, useNode} from "../../mixins/useNode";
import {object3dEmits, object3dProps, useObject3d} from "../../mixins/useObject3D";
import {Group} from "three";
import {reactive} from "vue";
import {GroupName} from "./index";

const props = defineProps({
  ...nodeProps,
  ...object3dProps,
})

const emits = defineEmits([
  ...nodeEmits,
  ...object3dEmits
])

const group = reactive(new Group())

const {status, node} = useNode(group, props, emits, GroupName)
const {} = useObject3d(group, props, emits)

defineExpose({...node})
</script>
<template>
  <slot v-if="status.mounted"></slot>
</template>
