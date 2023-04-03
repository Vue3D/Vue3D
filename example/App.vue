<template>
    <vue3d :width="500" :height="500" active>
        <v3d-perspective-camera main :width="200" :height="200" :position="{x:0,y:0,z:20}">
            <v3d-directional-light :intensity="0.8"></v3d-directional-light>
        </v3d-perspective-camera>
        <v3d-cube></v3d-cube>
        <v3d-grid-helper :size="100" :divisions="100"></v3d-grid-helper>
    </vue3d>
</template>

<script setup>
import {V3dCube, V3dDirectionalLight, V3dGridHelper, V3dPerspectiveCamera} from "@vue3d";
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
