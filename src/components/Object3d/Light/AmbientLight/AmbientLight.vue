<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {AmbientLight} from 'three'
import {provide, reactive} from "vue";
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {transformEmits, transformProps, useTransform} from "../../useTransform";

export default {
    name: "AmbientLight",
    props: {
        ...object3dProps,
        ...transformProps,
        color: {type: String, default: 'rgb(255,255,255)'},
        intensity: {type: Number, default: 1.0},
    },
    emits: [...transformEmits],
    setup(props, ctx) {
        const light = reactive(new AmbientLight(props.color, props.intensity))

        const {process, data,} = useObject3d(light, props, ctx)
        useTransform(light, props, ctx)

        provide('parent', data)

        return {
            process, data
        }
    }
}
</script>
