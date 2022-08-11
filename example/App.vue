<template>
  <vue3d :width="200" :height="200"></vue3d>
</template>

<script>

import Vue3d from "@vue3d/core/Vue3D.vue";

export default {
  name: "Example",
  components: {Vue3d},
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