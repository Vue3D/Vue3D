<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {provide, watch} from "vue";
import {BoxGeometry, Mesh} from '../../../../three'
import {object3dEmits, object3dProps, useObject3d} from "../../../composition/objectd3d";
import {ceramic} from "../../../const/materials";

export default {
  name: "Cube",
  props: {
    ...object3dProps,
    x: {type: Number, default: 1},
    y: {type: Number, default: 1},
    z: {type: Number, default: 1},
    xSegments: {type: Number, default: 1},
    ySegments: {type: Number, default: 1},
    zSegments: {type: Number, default: 1},
    material: {
      type: Object, default() {
        return ceramic()
      }
    },
    withHelper: {type: Boolean, default: false}
  },
  emits: [...object3dEmits],
  setup(props, ctx) {
    const geometry = new BoxGeometry(props.x, props.y, props.z, props.xSegments, props.ySegments, props.zSegments);
    const object3d = new Mesh(geometry, props.material);

    const {
      process,
      data,
      init,
    } = useObject3d(ctx)

    watch(() => props.material, (val) => {
      setMaterial(val)
    })

    const setMaterial = (mtl) => {
      if (geometry) {
        object3d.material = mtl;
      }
    }

    setMaterial(props.material)

    init(object3d, props)

    provide('parent', data)

    return {process, data}
  },

}
</script>
