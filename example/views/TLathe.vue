<script setup>
import DrawPoints from "../components/DrawPoints.vue";
import {V3dBoxHelper, V3dCube, V3dDirectionalLight, V3dGridHelper, V3dLathe, V3dPerspectiveCamera} from "../../src";
import {reactive, ref} from "vue";

const points = ref([])
const getPoints = (p) => {
    points.value.length = 0
    console.log(p)
    p.forEach(item => {
        points.value.push(item)
    })
}

const data = reactive({
    target: null,
    position: {x: 3, y: 5, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    scale: {x: 1, y: 1, z: 1}
})

const onPick = (target) => {
    data.target = target
}

</script>

<template>
    <DrawPoints style="border: aquamarine 1px solid;" :width="200" :height="200" @change="getPoints"></DrawPoints>
    <vue3d ref="scene" :width="800" :height="800" active>
        <v3d-perspective-camera main withRay :control="['orbit','transform']" :position="{x:0,y:0,z:20}" @pick="onPick">
            <v3d-directional-light :intensity="0.8"></v3d-directional-light>
        </v3d-perspective-camera>
        <v3d-grid-helper :size="100" :divisions="100"></v3d-grid-helper>
        <v3d-box-helper  :target="data.target"></v3d-box-helper>
        <v3d-lathe :points="points" :segments="30" contain></v3d-lathe>
        <v3d-cube></v3d-cube>
    </vue3d>
</template>
