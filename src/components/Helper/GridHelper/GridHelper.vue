<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {object3dEmits, object3dProps, useObject3d} from "@vue3d/composition/objectd3d";
import {provide} from "vue";
import {GridHelper} from 'three'

export default {
    name: "GridHelper",
    props: {
        ...object3dProps,
        x: {type: Number, default: 1},
        y: {type: Number, default: 1},
        z: {type: Number, default: 1},
        size: {type: Number, default: 10},
        divisions: {type: Number, default: 10},
    },
    emits: [...object3dEmits],
    setup(props, ctx) {
        const helper = new GridHelper(props.size, props.divisions);
        const {
            process,
            data,
            init,
        } = useObject3d(ctx)

        init(helper, props)
        provide('parent', data)

        return {
            process, data
        }
    }
}
</script>
