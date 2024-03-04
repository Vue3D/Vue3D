<script setup>
import {Mesh, SphereGeometry} from 'three'
import {object3dEmits, object3dProps, useObject3d} from "../../useObject3d";
import {transformEmits, transformProps, useTransform} from "../../useTransform";
import {materialEmits, materialProps, useMaterial} from "../../useMaterial";
import {reactive} from "vue";
import {ComponentName, SphereGeom} from "./index";

const props = defineProps({
  ...object3dProps,
  ...transformProps,
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

const emits = defineEmits([...transformEmits, ...materialEmits, ...object3dEmits])

const geometry = new SphereGeometry(props.radius, props.widthSegments, props.heightSegments, props.phiStart, props.phiLength, props.thetaStart, props.thetaLength);
const object3d = reactive(new SphereGeom());
const mesh = new Mesh(geometry)

const {status, data} = useObject3d(object3d, props, emits, ComponentName)
useTransform(object3d, props, emits)
useMaterial(mesh, props, emits)

object3d.add(mesh)
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
