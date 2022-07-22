<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {AmbientLight} from 'three'
import {provide, onBeforeUnmount, onBeforeMount} from "vue";
import {object3dProps, useObject3d} from "../../composition/objectd3d";

export default {
  name: "AmbientLight",
  props: {
    ...object3dProps,
    color: {type: String, default: 'rgb(255,255,255)'},
    intensity: {type: Number, default: 1.0},
  },
  setup(props, ctx) {
    const light = new AmbientLight(props.color, props.intensity);
    const {
      process,
      data,
      init,
      mount,
      unmount,
      setPosition,
      setRotation,
      setScale,
      setTarget,
      render
    } = useObject3d()

    init(light, props)
    provide('parent', data)

    return {
      process, data
    }
  }
}
</script>
