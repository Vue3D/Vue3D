<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {AmbientLight} from 'three'
import {provide, onMounted} from "vue";
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
      vue3d,
      handler,
      parent,
      process,
      setPosition,
      setRotation,
      setScale,
      setTarget,
      addObject3d,
      removeObject3d,
      render
    } = useObject3d(light)

    onMounted(() => {
      setPosition(props.position)
      setRotation(props.rotation)
      setScale(props.scale)
      setTarget(props.target)
      addObject3d(light)
      process.mounted = true
      console.log(handler.scene)
    })

    provide('parent', light)

    return {
      process
    }
  }
}
</script>
