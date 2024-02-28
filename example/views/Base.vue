<template>
  <v3d-stage ref="base" :width="800" :height="800" backgroundColor="rgb(255,255,255)">
    <v3d-Scene></v3d-Scene>
  </v3d-stage>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {V3dScene, V3dStage} from "../../src";

const base = ref(null)
const mode = ref("translate")

onMounted(() => {
  console.log(base.value)
})

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
