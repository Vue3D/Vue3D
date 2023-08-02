<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {reactive} from "vue";
import {BoxGeometry, Object3D, Mesh} from 'three'
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {materialEmits, materialProps, useMaterial} from "../../useMaterial";
import {transformEmits, transformProps, useTransform} from "../../useTransform";

export default {
  name: "Cube",
  props: {
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
  },
  emits: [...transformEmits, ...materialEmits],
  setup(props, ctx) {
    const geometry = new BoxGeometry(props.x, props.y, props.z, props.xSegments, props.ySegments, props.zSegments)
    const object3d = reactive(new Object3D())
    const mesh = new Mesh(geometry)

    const {process, data} = useObject3d(object3d, props, ctx)
    useTransform(object3d, props, ctx)
    useMaterial(mesh, props, ctx)
    object3d.add(mesh)

    return {process, data}
  },

}
</script>
