<script setup>
import {Mesh, SphereGeometry} from 'three'
import {reactive} from "vue";
import {nodeEmits, nodeProps, useNode} from "../../../mixins/useNode"
import {object3dEmits, object3dProps, useObject3d} from "../../../mixins/useObject3D"
import {materialEmits, materialProps, useMaterial} from "../../../use/useMaterial"
import {SphereGeom, SphereName} from "./index";

const props = defineProps({
  ...nodeProps,
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

const emits = defineEmits([
  ...nodeEmits,
  ...object3dEmits,
  ...materialEmits,
])

const geometry = new SphereGeometry(props.radius, props.widthSegments, props.heightSegments, props.phiStart, props.phiLength, props.thetaStart, props.thetaLength);
const object3d = reactive(new SphereGeom());
const mesh = new Mesh(geometry)

const {status, node} = useNode(object3d, props, emits, SphereName)
const {} = useObject3d(object3d, props, emits)
const {} = useMaterial(mesh, props, emits)

object3d.add(mesh)

/** EXPOSE **/
defineExpose({...node})
</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
