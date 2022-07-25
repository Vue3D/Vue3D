<template>
  <vue3d :width="width" :height="height" clearColor="rgb(255,255,255)">
    <perspective-camera name="camera" :position="{x:0,y:0,z:20}">
      <directional-light name="dire" v-model:position="position" :intensity="0.9"></directional-light>
    </perspective-camera>
    <ambient-light name="light" :intensity="0.1"></ambient-light>
    <obj-loader ref="loader" name="obj" :path="path.obj" :position="{x:0,y:-5,z:0}" v-model:scale="scale"
                :map="path.uv" contain></obj-loader>
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
      position: {x: 0, y: 0, z: 20},
      scale: 1,
      path: {
        obj: '/example/cup.obj',
        // uv:'/example/cup_map.jpg',
        // obj: 'https://s3.cifuwu.com/storage/model/2ce7855396fad3381298d9aaab5b466d0804fe24.obj',
        uv: 'https://s3.cifuwu.com/image/show/1080/6350c200f09097ad6bf8653daf421efc2019f026.png'
      }
    }
  },
  mounted() {
    this.ready = true
    window.addEventListener('resize', () => {
      this.width = document.body.clientWidth
      this.height = document.body.clientHeight
    })
    setInterval(() => {
      // this.$refs.loader.render()
      // this.scale += 0.001
    }, 20)
    setTimeout(() => {
      // this.path.obj = 'https://s3.cifuwu.com/storage/model/2ce7855396fad3381298d9aaab5b466d0804fe24.obj'
      // this.path.obj = '/example/cup.obj'
    }, 1000)
  },
  watch: {
    scale(val) {
      console.log(val)
    }
  }
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