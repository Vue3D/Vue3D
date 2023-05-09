<script>
import {inject} from "vue";
import {GridHelper} from 'three'

export default {
    name: "GridHelper",
    props: {
        size: {type: Number, default: 10},
        divisions: {type: Number, default: 10},
    },
    setup(props, ctx) {
        const stage = inject('stage')
        const helper = new GridHelper(props.size, props.divisions)
        stage.scene.add(helper)
    }
}
</script>


<template></template>
