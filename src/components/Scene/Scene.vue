<template><!-- Scene --></template>

<script>
import {inject} from "vue";

export default {
  name: "Scene",
  setup() {
    const handler = inject('handler')
    const width = inject('width')
    // const scene = new THREE.
    return {width}
  }
}
</script>
