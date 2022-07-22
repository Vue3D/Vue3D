<template>
  <slot v-if="process.mounted"></slot>
</template>

<script>
import {PerspectiveCamera, CameraHelper} from 'three'
import {computed, inject, provide, onBeforeMount, onBeforeUnmount} from "vue";
import Orbit from "../../library/Orbit";
import {object3dProps, useObject3d} from "../../composition/objectd3d";

export default {
  name: "PerspectiveCamera",
  props: {
    ...object3dProps,
    x: {type: Number, default: 0}, // viewport x 零点：左
    y: {type: Number, default: 0}, // viewport y 零点：下
    width: {type: Number}, // viewport width
    height: {type: Number}, // viewport height
    near: {type: Number, default: 0.1},
    far: {type: Number, default: 2000},
    fov: {type: Number, default: 50},
    /* helper */
    withHelper: {type: Boolean, default: false},
    visibleHelper: {type: Boolean, default: false},
    withOrbit: {type: Boolean, default: true},
  },
  setup(props, ctx) {
    const vWidth = inject('width')
    const vHeight = inject('height')
    const canvas = inject('canvas')

    const width = computed(() => {
      return props.width ? props.width : vWidth.value
    })
    const height = computed(() => {
      return props.height ? props.height : vHeight.value
    })

    const camera = new PerspectiveCamera(props.fov, width.value / height.value, props.near, props.far);

    const {
      handler,
      process,
      data,
      init,
      render,
      setPosition,
      setRotation,
      setScale,
      setTarget
    } = useObject3d()

    const updateCamera = () => {
      camera.fov = props.fov;
      camera.aspect = width.value / height.value;
      camera.updateProjectionMatrix();
    }

    if (props.withHelper) {
      const helper = new CameraHelper(camera);
      helper.visible = props.visibleHelper;
      camera.helper = helper;
      handler.scene.add(helper)
    }

    if (props.withOrbit) {
      const orbit = new Orbit(camera, canvas.value)
      orbit.control.addEventListener('change', render, false);
    }

    handler.camera = camera

    init(camera, props)
    provide('parent', data)

    return {
      process, width, height, data
    }
  }
}
</script>
