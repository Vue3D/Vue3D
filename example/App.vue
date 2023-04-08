<template>
    <vue3d ref="scene" :width="800" :height="800" active>
        <v3d-perspective-camera main withRay withOrbit autoOrbit :rayLayer="[0]" :position="{x:0,y:0,z:20}"
                                @raycast="onCast">
            <v3d-directional-light :intensity="0.8"></v3d-directional-light>
        </v3d-perspective-camera>
        <v3d-grid-helper :layer="31" :size="100" :divisions="100"></v3d-grid-helper>
        <v3d-box-helper :layer="31" :target="data.target"></v3d-box-helper>


        <v3d-cube :position="{y:1}"></v3d-cube>
        <v3d-obj-loader path="/example/cup.obj" contain></v3d-obj-loader>
    </vue3d>
    <div class="scene"></div>
</template>

<script setup>
import {V3dBoxHelper, V3dCube, V3dDirectionalLight, V3dGridHelper, V3dObjLoader, V3dPerspectiveCamera} from "../src";
import {inject, reactive, ref} from "vue";

const v3d = inject('v3d')
const scene = ref(null)

const data = reactive({
    target: null
})

const onCast = (targets) => {
    if (targets.length > 0) {
        data.target = targets[0].object
    } else {
        data.target = null
    }
    console.log(targets)
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
