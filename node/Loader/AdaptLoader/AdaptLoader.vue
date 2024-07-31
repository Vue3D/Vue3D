<script setup>
import {computed, defineAsyncComponent, inject} from "vue";
import {FormatWhitelist} from "./index";
import {loaderEmits, loaderProps} from "../../../use/useLoader";

defineOptions({
  inheritAttrs: false
})
const emits = defineEmits([...loaderEmits])
const props = defineProps({
  ...loaderProps,
  format: {type: String},
})

const stage = inject("stage")
// 加载器列表
const loaderComponents = {
  OBJ: defineAsyncComponent(() => import('../ObjLoader/ObjLoader.vue')),
  DEFAULT: defineAsyncComponent(() => import('../ErrLoaded/ErrLoaded.vue')),
}

/**
 * 获取加载器类型
 * @type {(function(): (*|string))|*}
 */
const getType = (() => {
  const suffix = props.path.substring(props.path.lastIndexOf(".") + 1);
  if (FormatWhitelist.includes(suffix.toUpperCase())) {
    return suffix.toUpperCase();
  } else if (FormatWhitelist.includes(props.format.toUpperCase())) {
    return props.format.toUpperCase()
  }
  return "DEFAULT"
})

// 加载器组件
const com = computed(() => {
  return loaderComponents[getType()]
})

</script>

<template>
  <Suspense>
    <component :is="com" v-bind="props"></component>
  </Suspense>
</template>
