<script setup>
import {onMounted} from "vue";
import {GridHelper} from 'three'
import {extendProps, useExtend} from "../../mixins/useExtend";
import {GridHelperName} from "./index";

defineOptions({
  inheritAttrs: false
})
const emits = defineEmits([])
const props = defineProps({
  size: {type: Number, default: 100},
  divisions: {type: Number, default: 100},
  ...extendProps,
})

const helper = new GridHelper(props.size, props.divisions)

const {extend} = useExtend(helper, props, emits, GridHelperName)

onMounted(() => {
  extend.add()
})

</script>

<template></template>
