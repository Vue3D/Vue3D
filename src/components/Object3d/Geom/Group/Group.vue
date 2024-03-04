<script setup>
import {object3dEmits, object3dProps, useObject3d,} from "../../useObject3d";
import {transformEmits, transformProps, useTransform} from "../../useTransform";
import {Group} from "three";
import {reactive} from "vue";
import {ComponentName} from "./index";

const props = defineProps({
  ...object3dProps,
  ...transformProps
})

const emits = defineEmits([...transformEmits, ...object3dEmits])

const object3d = reactive(new Group())

const {status} = useObject3d(object3d, props, emits, ComponentName)
useTransform(object3d, props, emits)

</script>
<template>
  <slot v-if="status.mounted"></slot>
</template>
