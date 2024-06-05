<script setup>
import {inject} from "vue";
import {GridHelper} from 'three'

const props = defineProps({
  size: {type: Number, default: 10},
  divisions: {type: Number, default: 10},
})

const stage = inject('stage')
const parent = inject('parent')

const helper = new GridHelper(props.size, props.divisions)

parent.add(helper)

</script>

<template></template>
