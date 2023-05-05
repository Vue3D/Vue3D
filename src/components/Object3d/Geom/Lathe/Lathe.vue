<script>
import {reactive} from "vue";
import {LatheGeometry, Mesh} from 'three'
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {materialProps, useMaterial} from "../../useMaterial";
import {transformEmits, transformProps, useTransform} from "../../useTransform";

export default {
    name: "Lathe",
    props: {
        ...object3dProps,
        ...transformProps,
        ...materialProps,
        points: {type: Array},// Vector2 对象数组
        segments: {type: Number, default: 12}, // 要生成的车削几何体圆周分段的数量，默认值是12。
        phiStart: {type: Number, default: 0}, //  以弧度表示的起始角度，默认值为0。
        phiLength: {type: Number, default: Math.PI * 2}, // 车削部分的弧度（0-2PI）范围，2PI将是一个完全闭合的、完整的车削几何体，小于2PI是部分的车削。默认值是2PI。
        withHelper: {type: Boolean, default: false},
    },
    emits: [...transformEmits],
    setup(props, ctx) {
        const geometry = new LatheGeometry(props.points, props.segments, props.phiStart, props.phiLength)
        const object3d = reactive(new Mesh(geometry))

        const {process, data} = useObject3d(object3d, props, ctx)
        useTransform(object3d, props, ctx)
        useMaterial(object3d, props)

        return {process, data}
    },
}
</script>

<template>
    <slot v-if="process.mounted"></slot>
</template>
