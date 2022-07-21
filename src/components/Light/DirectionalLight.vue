<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {DirectionalLight, DirectionalLightHelper} from 'three'
import {provide, onMounted} from "vue";
import {object3dProps, useObject3d} from "../../composition/objectd3d";

export default {
  name: "DirectionalLight",
  props: {
    ...object3dProps,
    color: {type: String, default: 'rgb(255,255,255)'},
    intensity: {type: Number, default: 1.0},
    withHelper: {type: Boolean, default: true},
    visibleHelper: {type: Boolean, default: false},
  },
  setup(props, ctx) {
    const light = new DirectionalLight(props.color, props.intensity);

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

    if (props.withHelper) {
      const helper = new DirectionalLightHelper(light);
      helper.visible = props.visibleHelper;
      light.helper = helper;
      light.add(helper)
    }

    onMounted(() => {
      setPosition(props.position)
      setRotation(props.rotation)
      setScale(props.scale)
      setTarget(props.target)
      addObject3d(light)
      process.mounted = true
    })

    provide('parent', light)

    return {
      process
    }
  }
}
</script>
