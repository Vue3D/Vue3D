<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {AmbientLight} from 'three'
import {provide} from "vue";
import {object3dEmits, object3dProps, useObject3d} from "../../../composition/objectd3d";

export default {
    name: "AmbientLight",
    props: {
        ...object3dProps,
        color: {type: String, default: 'rgb(255,255,255)'},
        intensity: {type: Number, default: 1.0},
    },
    emits: [...object3dEmits],
    setup(props, ctx) {
        const light = new AmbientLight(props.color, props.intensity);
        const {
            process,
            data,
            init,
        } = useObject3d(ctx)

        init(light, props)
        provide('parent', data)

        return {
            process, data
        }
    }
}
</script>
