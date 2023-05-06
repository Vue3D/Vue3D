<script setup>
import DrawPoints from "../components/DrawPoints.vue";
import {V3dDirectionalLight, V3dGridHelper, V3dLathe, V3dPerspectiveCamera} from "../../src";
import {ref} from "vue";

const points = ref([])
const getPoints = (p) => {
    points.value.length = 0
    p.forEach(item=>{
        points.value.push(item)
    })
}

</script>

<template>
    <DrawPoints :width="400" :height="400" @change="getPoints"></DrawPoints>
    <vue3d ref="scene" :width="800" :height="800" active>
        <v3d-perspective-camera main withRay :control="['orbit','transform']" :position="{x:0,y:0,z:20}">
            <v3d-directional-light :intensity="0.8"></v3d-directional-light>
        </v3d-perspective-camera>
        <v3d-grid-helper :size="100" :divisions="100"></v3d-grid-helper>
        <v3d-lathe :points="points" :segments="30" contain></v3d-lathe>
    </vue3d>
</template>
