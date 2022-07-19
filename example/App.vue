<template>
  <Vue3D :width="width" :height="height">
    <v3d-scene></v3d-scene>
  </Vue3D>
</template>

<script>
import {onMounted} from "vue";

export default {
  name: "Example",
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