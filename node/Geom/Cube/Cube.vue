<script setup>
import {reactive} from "vue";
import {BoxGeometry, Mesh} from 'three'
import {materialEmits, materialProps, useMaterial,} from "../../../use";
import {nodeEmits, nodeProps, object3dEmits, object3dProps, useNode, useObject3d} from "../../../mixins"

import {CubeGeom, CubeName} from "./index";

const props = defineProps({
  ...nodeProps,
  ...object3dProps,
  ...materialProps,
  x: {type: Number, default: 1},
  y: {type: Number, default: 1},
  z: {type: Number, default: 1},
  xSegments: {type: Number, default: 1},
  ySegments: {type: Number, default: 1},
  zSegments: {type: Number, default: 1},
  withHelper: {type: Boolean, default: false},
})
const emits = defineEmits([
  ...nodeEmits,
  ...object3dEmits,
  ...materialEmits,
])

const geometry = new BoxGeometry(props.x, props.y, props.z, props.xSegments, props.ySegments, props.zSegments)
const object3d = reactive(new CubeGeom())
const mesh = new Mesh(geometry)

const {status, node} = useNode(object3d, props, emits, CubeName)
const {} = useObject3d(object3d, props, emits)
const {} = useMaterial(mesh, props, emits)

object3d.add(mesh)

/** EXPOSE **/
defineExpose({...node})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
