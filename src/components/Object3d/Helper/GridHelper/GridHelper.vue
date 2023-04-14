<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {transformEmits, transformProps, useTransform} from "../../useTransform";
import {provide, reactive} from "vue";
import {GridHelper} from 'three'

export default {
    name: "GridHelper",
    props: {
        ...object3dProps,
        ...transformProps,
        x: {type: Number, default: 1},
        y: {type: Number, default: 1},
        z: {type: Number, default: 1},
        size: {type: Number, default: 10},
        divisions: {type: Number, default: 10},
        layer: {type: Number, default: 22}
    },
    emits: [...transformEmits],
    setup(props, ctx) {
        const helper = reactive(new GridHelper(props.size, props.divisions))

        const {process, data,} = useObject3d(helper, props, ctx)
        useTransform(helper, props, ctx)

        provide('parent', data)

        return {
            process, data
        }
    }
}
</script>
