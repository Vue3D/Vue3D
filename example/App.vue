<template>
  <vue3d :width="width" :height="height">
    <perspective-camera :position="{x:0,y:0,z:20}"></perspective-camera>
    <directional-light :position="{x:0,y:0,z:10}" :intensity="0.6"></directional-light>
    <ambient-light :intensity="0.1"></ambient-light>
    <cube :x="1" :y="1" :z="1"></cube>
  </vue3d>
</template>

<script>
import {Cube} from "../src/components/Geom";
import {PerspectiveCamera} from "../src/components/Camera";
import {AmbientLight, DirectionalLight} from "../src/components/Light";

export default {
  name: "Example",
  components: {AmbientLight, PerspectiveCamera, Cube, DirectionalLight},
  data() {
    return {
      ready: false,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    }
  },
  mounted() {
    this.ready = true
    window.addEventListener('resize', () => {
      this.width = document.body.clientWidth
      this.height = document.body.clientHeight
    })
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