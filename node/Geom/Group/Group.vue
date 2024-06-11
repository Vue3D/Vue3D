<script setup>
import {object3dEmits, object3dProps, useObject3d,} from "vue3d/use";
import {Group} from "three";
import {reactive} from "vue";
import {ComponentName} from "./index";

const props = defineProps({
  ...object3dProps,
})

const emits = defineEmits([...object3dEmits])

const object3d = reactive(new Group())

const {status} = useObject3d(object3d, props, emits, ComponentName)
</script>
<template>
  <slot v-if="status.mounted"></slot>
</template>
