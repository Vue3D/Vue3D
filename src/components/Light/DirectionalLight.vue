<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {DirectionalLight, DirectionalLightHelper} from 'three'
import {provide, onBeforeMount, onBeforeUnmount} from "vue";
import {object3dEmits, object3dProps, useObject3d} from "../../composition/objectd3d";

export default {
  name: "DirectionalLight",
  props: {
    ...object3dProps,
    color: {type: String, default: 'rgb(255,255,255)'},
    intensity: {type: Number, default: 1.0},
    withHelper: {type: Boolean, default: true},
    visibleHelper: {type: Boolean, default: false},
  },
  emits: [...object3dEmits],
  setup(props, ctx) {
    const light = new DirectionalLight(props.color, props.intensity);

    const {
      process,
      data,
      init,
    } = useObject3d(ctx)

    if (props.withHelper) {
      const helper = new DirectionalLightHelper(light);
      helper.visible = props.visibleHelper;
      light.helper = helper;
      light.add(helper)
    }

    init(light, props)

    provide('parent', data)

    return {
      process, data
    }
  }
}
</script>
