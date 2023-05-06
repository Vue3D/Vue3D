<script setup>
import {markRaw, onMounted, reactive, ref} from 'vue'
import {Vector2} from "three";

const emits = defineEmits(["change"])
const props = defineProps(["width", "height"])
const canvas = ref(null)
const flag = ref(false)
const points = markRaw([])
let ctx = null

onMounted(() => {
    ctx = canvas.value.getContext("2d");
    // //设置线宽
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red'; //线条
})

const onStart = (e) => {
    ctx.clearRect(0, 0, props.width, props.height);
    flag.value = true
    points.length = 0
    ctx.beginPath()
}

const mousemove = (e) => {
    if (!flag.value) return;
    const x = e.clientX - canvas.value.offsetLeft
    const y = e.clientY - canvas.value.offsetTop
    const point = new Vector2(props.width - x, props.height - y)
    ctx.lineTo(x, y); //下一点
    ctx.stroke();  //fill()执行填充色  stroke()执行线条
    points.push(point)
}

const onEnd = (e) => {
    flag.value = false
    emits("change", points)
}

//
// //获得2维绘图对象
// var ctx = canvas.getContext("2d");

</script>

<template>
    <canvas ref="canvas" :width="width" :height="height" @pointerdown="onStart" @pointermove="mousemove"
            @pointerup="onEnd" @pointerleave="onEnd"></canvas>
</template>
