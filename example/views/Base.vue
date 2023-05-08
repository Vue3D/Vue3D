<template>
    <vue3d ref="scene" :width="800" :height="800" active>
        <v3d-perspective-camera main withRay :control="['orbit','transform']" :position="{x:0,y:0,z:20}" @pick="onPick">
            <v3d-directional-light :intensity="0.8"></v3d-directional-light>
        </v3d-perspective-camera>
        <v3d-grid-helper :size="100" :divisions="100"></v3d-grid-helper>
<!--        <v3d-box-helper :layer="31" :target="data.target"></v3d-box-helper>-->
        <v3d-cube v-model:position="data.position" v-model:rotation="data.rotation" :x="10"></v3d-cube>
        <v3d-obj-loader path="/example/cup.obj" contain v-model:position="data.position"
                        v-model:rotation="data.rotation" v-model:scale="data.scale"></v3d-obj-loader>
    </vue3d>
</template>

<script setup>
import {ev, V3dCube,V3dBoxHelper, V3dDirectionalLight, V3dGridHelper, V3dObjLoader, V3dPerspectiveCamera} from "../../src";
import {inject, onMounted, reactive, ref, watch} from "vue";

const $vue3d = inject('$vue3d')
const scene = ref(null)
const mode = ref("translate")

watch(mode, (val) => {
    console.log(val)
})

const data = reactive({
    target: null,
    position: {x: 3, y: 5, z: 0},
    rotation: {x: 0, y: 0, z: 0},
    scale: {x: 1, y: 1, z: 1}
})

const onPick = (target) => {
    data.target = target
}

onMounted(() => {
    const uuid = scene.value.id
    window.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'q':
                $vue3d.emit(ev.selected.tfMode.handler, "translate", uuid)
                break;

            case 'w':
                $vue3d.emit(ev.selected.tfMode.handler, "rotate", uuid)
                break;

            case "e":
                $vue3d.emit(ev.selected.tfMode.handler, "scale", uuid)
                break;

            case "t":
                $vue3d.emit(ev.selected.tfSpace.handler, null, uuid)
                break;
        }
    })
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
