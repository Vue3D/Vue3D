<script setup>
import {inject, reactive} from "vue";
import {Object3D} from "three";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js'
import {nodeEmits, nodeProps, useNode} from "../../../mixins/useNode";
import {object3dEmits, object3dProps, useObject3d} from "../../../mixins/useObject3D";
import {materialEmits, materialProps, useMaterial} from "../../../use/useMaterial";
import {loaderEmits, loaderProps, useLoader} from "../../../use/useLoader";
import {ObjLoaderName} from "./";

defineOptions({
  inheritAttrs: false
})
const emits = defineEmits([...nodeEmits, ...object3dEmits, ...materialEmits, ...loaderEmits])
const props = defineProps({
  ...nodeProps,
  ...object3dProps,
  ...materialProps,
  ...loaderProps,
})
const stage = inject("stage")

const object3d = reactive(new Object3D());

const {status, node} = useNode(object3d, props, emits, ObjLoaderName);
const {setChildLayer, setSize} = useObject3d(object3d, props, emits)
const {setMaterial} = useMaterial(object3d, props, emits)
const {onLoad} = useLoader(object3d, props, emits)

const {onComplete, onProgress, onError} = onLoad(new OBJLoader(props.manager))

onComplete(group => {
  group.name = props.name;
  group.traverse((child) => {
    child.name = object3d.uuid
    setChildLayer(child, props.layer)
    object3d.add(child)
  });
  setMaterial(props.material)
  setSize(props.size)
  stage.render()
})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
