<template>
  <vue3d :width="width" :height="height" clearColor="rgb(255,255,255)">
    <perspective-camera>
      <directional-light :position="{x:0,y:10,z:-10}" :intensity="0.9"></directional-light>
    </perspective-camera>
    <ambient-light :intensity="0.1"></ambient-light>
    <obj-loader path="/example/cup.obj" :scale="{x:0.1,y:0.1,z:0.1}" :position="{x:0,y:-5,z:0}"
                map="/example/cup_map.jpg"></obj-loader>
    <!--    <cube></cube>-->
  </vue3d>
</template>

<script>
import {Cube} from "../src/components/Geom";
import {PerspectiveCamera} from "../src/components/Camera";
import {AmbientLight, DirectionalLight} from "../src/components/Light";
import {ObjLoader} from "../src/components/Loader";

export default {
  name: "Example",
  components: {ObjLoader, AmbientLight, PerspectiveCamera, Cube, DirectionalLight},
  data() {
    return {
      ready: false,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      position: {x: 0, y: 0, z: 20}
    }
  },
  mounted() {
    this.ready = true
    window.addEventListener('resize', () => {
      this.width = document.body.clientWidth
      this.height = document.body.clientHeight
    })
    setInterval(() => {
      this.position.x++
      console.log(this.position)
    }, 200)
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