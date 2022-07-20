<template>
  <vue3d :width="width" :height="height">
    <cube :x="1" :y="1" :z="1" name="ge">
      <cube :x="1" :y="1" :z="1" name="ge">

      </cube>
    </cube>
  </vue3d>
</template>

<script>
import {Cube} from "../src/components/Geom";

export default {
  name: "Example",
  components: {Cube},
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