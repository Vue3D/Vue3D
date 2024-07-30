<script setup>
import {computed, defineAsyncComponent, inject, reactive, ref} from "vue";
import {DefaultLoadingManager, LoadingManager, Object3D} from "three";
import {nodeEmits, nodeProps, useNode} from "../../mixins/useNode";
import {FormatWhitelist, LoaderName, ObjLoaderName} from "./";
import {object3dEmits, object3dProps, useObject3d} from "../../mixins/useObject3D";
import {materialEmits, materialProps, useMaterial} from "../../use/useMaterial";


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
  manager: {type: Object, default: DefaultLoadingManager},
  format: {type: String},
})

const stage = inject("stage")
const loaderComponents = {
  OBJ: defineAsyncComponent(() => import('./ObjLoader/ObjLoader.vue')),
  DEFAULT: defineAsyncComponent(() => import('./ErrLoaded/ErrLoaded.vue')),
}

const getType = (() => {
  const suffix = props.path.substring(props.path.lastIndexOf(".") + 1);
  if (FormatWhitelist.includes(suffix.toUpperCase())) {
    return suffix.toUpperCase();
  } else if (FormatWhitelist.includes(props.format.toUpperCase())) {
    return props.format.toUpperCase()
  }
  return "DEFAULT"
})

const com = computed(() => {
  return loaderComponents[getType()]
})

</script>

<template>
  <Suspense>
    <component :is="com" :path="props.path" :size="props.size"></component>
  </Suspense>
</template>
