<template>
  <vue3d :width="500" :height="500" active>
    <perspective-camera main :width="200" :height="200" :position="{x:0,y:0,z:20}">
      <directional-light :intensity="0.8"></directional-light>
    </perspective-camera>
    <cube></cube>
  </vue3d>
</template>

<script>

import {PerspectiveCamera} from "@vue3d";
import {DirectionalLight} from "@vue3d";
import {Cube} from "@vue3d"

export default {
  name: "Example",
  components: {DirectionalLight, PerspectiveCamera, Cube},
  setup() {

  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>