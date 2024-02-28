<script setup>
import {inject, onMounted, provide} from "vue";
import {Scene} from "three";
import {inLifecycle, useLifecycle} from "../../cells/lifecycle";
import {Node, TYPE} from "../../classes/node.class"

const stage = inject('stage')
const parent = inject('parent')
const event = inject('event')

const props = defineProps({
  ...inLifecycle.props
})

const emits = defineEmits([...inLifecycle.emits])
const scene = new Scene()

const life = useLifecycle(scene, props, emits)

scene.name = life.uuid

onMounted(() => {
  life.onMounted()
})

/** Expose **/
defineExpose({scene})

provide("parent", new Node(scene, TYPE.SCENE, life.uuid))

</script>

<template>
  <slot v-if="life.status.mounted"></slot>
</template>
