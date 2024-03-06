<template>
  <v3d-stage ref="base" :width="width" :height="800" :tfMode="mode">
    <v3d-stage-camera :position="{x:0,y:0,z:-20}" main></v3d-stage-camera>
    <v3d-cube></v3d-cube>
    <v3d-ambient-light></v3d-ambient-light>
    <v3d-grid-helper></v3d-grid-helper>
    <v3d-box-helper></v3d-box-helper>
    <v3d-scene uuid="child"></v3d-scene>
  </v3d-stage>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {V3dAmbientLight, V3dBoxHelper, V3dCube, V3dGridHelper, V3dScene, V3dStage, V3dStageCamera} from "../../src";

const base = ref(null)
const mode = ref("translate")
const width = ref(800)

onMounted(() => {

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
