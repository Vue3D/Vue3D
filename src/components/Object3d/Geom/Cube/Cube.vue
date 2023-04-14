<template>
    <slot v-if="process.mounted"></slot>
</template>

<script>
import {provide, reactive} from "vue";
import {BoxGeometry, Mesh} from 'three'
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {materialProps, useMaterial} from "../../useMaterial";
import {transformEmits, transformProps, useTransform} from "../../useTransform";

export default {
    name: "Cube",
    props: {
        ...object3dProps,
        ...transformProps,
        ...materialProps,
        x: {type: Number, default: 1},
        y: {type: Number, default: 1},
        z: {type: Number, default: 1},
        xSegments: {type: Number, default: 1},
        ySegments: {type: Number, default: 1},
        zSegments: {type: Number, default: 1},
        withHelper: {type: Boolean, default: false},
    },
    emits: [...transformEmits],
    setup(props, ctx) {
        const geometry = new BoxGeometry(props.x, props.y, props.z, props.xSegments, props.ySegments, props.zSegments)
        const object3d = reactive(new Mesh(geometry, props.material))

        const {process, data} = useObject3d(object3d, props, ctx)
        useTransform(object3d, props, ctx)
        useMaterial(object3d, props.material)

        provide('parent', data)

        return {process, data}
    },

}
</script>
