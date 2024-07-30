<script setup>
import {reactive} from "vue";
import {DefaultLoadingManager, Object3D} from "three";
import {nodeEmits, nodeProps, useNode} from "../../../mixins/useNode";
import {object3dEmits, object3dProps, useObject3d} from "../../../mixins/useObject3D";
import {materialEmits, materialProps, useMaterial} from "../../../use/useMaterial";
import {ErrLoadedName, ErrorObject3D} from "./";

defineOptions({
  inheritAttrs: false
})
const emits = defineEmits([...nodeEmits, ...object3dEmits, ...materialEmits, "load:start", "load:progress", "load:complete", "load:error"])
const props = defineProps({
  ...nodeProps,
  ...object3dProps,
  ...materialProps,
  path: {type: String},
  size: {type: Number, default: 0},
  manager: {type: Object, default: DefaultLoadingManager}
})

const object3d = reactive(new ErrorObject3D());

const {status, node} = useNode(object3d, props, emits, ErrLoadedName)
const {} = useObject3d(object3d, props, emits)
const {} = useMaterial(object3d, props, emits)

object3d.name = ErrLoadedName
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
