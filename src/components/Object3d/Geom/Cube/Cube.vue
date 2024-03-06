<script setup>
import {defineExpose, inject, reactive, toRaw} from "vue";
import {BoxGeometry, Mesh} from 'three'
import {object3dEmits, object3dProps, useObject3d} from "../../useObject3d";
import {materialEmits, materialProps, useMaterial} from "../../useMaterial";
import {transformEmits, transformProps} from "../../useTransform";
import {ComponentName, CubeGeom} from "./index";

const props = defineProps({
  ...object3dProps,
  ...transformProps,
  ...materialProps,
  x: {type: Number, default: 1},
  y: {type: Number, default: 1},
  z: {type: Number, default: 1},
  xSegments: {type: Number, default: 1},
  ySegments: {type: Number, default: 1},
  zSegments: {type: Number, default: 1},
  withHelper: {type: Boolean, default: false},
})
const emits = defineEmits([...transformEmits, ...materialEmits, ...object3dEmits])

const parent = inject('parent')
const geometry = new BoxGeometry(props.x, props.y, props.z, props.xSegments, props.ySegments, props.zSegments)
const object3d = reactive(new CubeGeom())
const mesh = new Mesh(geometry)

const {status} = useObject3d(object3d, props, emits, ComponentName)
const {} = useMaterial(mesh, props, emits)

object3d.add(mesh)

/** EXPOSE **/
defineExpose({data: toRaw(object3d)})

parent.add(object3d, ComponentName, props.uuid)
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
