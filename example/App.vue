<template>
    <vue3d ref="scene" :width="500" :height="500" active>
        <v3d-perspective-camera main withRay :rayTarget="group" :position="{x:0,y:0,z:20}" @cast="onCast">
            <v3d-directional-light :intensity="0.8"></v3d-directional-light>
        </v3d-perspective-camera>
        <v3d-group ref="group">
            <v3d-cube></v3d-cube>
            <v3d-cube :position="{y:1}"></v3d-cube>
        </v3d-group>
        <v3d-grid-helper :layer="31" :size="100" :divisions="100"></v3d-grid-helper>
    </vue3d>
</template>

<script setup>
import {V3dCube, V3dDirectionalLight, V3dGridHelper, V3dGroup, V3dPerspectiveCamera} from "@vue3d";
import {ref} from "vue";

const scene = ref(null)
const group = ref(null)
const onCast = (object) => {
    console.log(object)
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
