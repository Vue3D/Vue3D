<script setup>
import {Mesh, SphereGeometry} from 'three'
import {materialEmits, materialProps, object3dEmits, object3dProps, useMaterial, useObject3d} from "@vue3d/core";
import {inject, reactive} from "vue";
import {ComponentName, SphereGeom} from "./index";

const props = defineProps({
  ...object3dProps,
  ...materialProps,
  radius: {type: Number, default: 1},
  widthSegments: {
    type: Number, default: 64, validate(value) {
      return value >= 3 && value <= 64
    }
  },
  heightSegments: {
    type: Number, default: 32, validate(value) {
      return value >= 2 && value <= 32
    }
  },
  phiStart: {type: Number, default: 0},
  phiLength: {
    type: Number, default() {
      return Math.PI * 2
    }
  },
  thetaStart: {type: Number, default: 0},
  thetaLength: {
    type: Number, default() {
      return Math.PI
    }
  },
  withHelper: {type: Boolean, default: false},
})

const emits = defineEmits([...materialEmits, ...object3dEmits])

const parent = inject("parent")

const geometry = new SphereGeometry(props.radius, props.widthSegments, props.heightSegments, props.phiStart, props.phiLength, props.thetaStart, props.thetaLength);
const object3d = reactive(new SphereGeom());
const mesh = new Mesh(geometry)

const {status} = useObject3d(object3d, props, emits, ComponentName)

useMaterial(mesh, props, emits)

object3d.add(mesh)

parent.add(object3d, ComponentName, props.uuid)
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
