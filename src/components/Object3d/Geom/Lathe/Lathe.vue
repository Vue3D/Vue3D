<script>
import {inject, reactive, watch} from "vue";
import {LatheGeometry, Mesh, Object3D, Vector3} from 'three'
import {object3dProps, useObject3d} from "../../useObjectd3d";
import {materialEmits, materialProps, useMaterial} from "../../useMaterial";
import {transformEmits, transformProps, useTransform} from "../../useTransform";
import Box3 from "../../../../library/Box3";

export default {
    name: "Lathe",
    props: {
        ...object3dProps,
        ...transformProps,
        ...materialProps,
        points: {type: Array},// Vector2 对象数组
        segments: {type: Number, default: 12}, // 要生成的车削几何体圆周分段的数量，默认值是12。
        phiStart: {type: Number, default: 0}, // 以弧度表示的起始角度，默认值为0。
        phiLength: {type: Number, default: Math.PI * 2}, // 车削部分的弧度（0-2PI）范围，2PI将是一个完全闭合的、完整的车削几何体，小于2PI是部分的车削。默认值是2PI。
        withHelper: {type: Boolean, default: false},
        contain: {type: Boolean, default: false},
    },
    emits: [...transformEmits, ...materialEmits],
    setup(props, ctx) {
        const stage = inject("stage")
        const object3d = reactive(new Object3D())
        const {process, data} = useObject3d(object3d, props, ctx)
        const {setScale} = useTransform(object3d, props, ctx)
        let mesh = null

        watch(() => props.points, (val) => {
            if (mesh) object3d.remove((mesh))
            const geometry = new LatheGeometry(props.points, props.segments, props.phiStart, props.phiLength)
            mesh = new Mesh(geometry)
            object3d.add(mesh)
            if (props.contain) {
                let box3 = new Box3(object3d)
                box3.center = new Vector3()
                let scale = box3.getContainedScale()
                setScale(scale)
                stage.render()
            }
            useMaterial(mesh, props)
        }, {deep: true})

        return {process, data}
    },
}
</script>

<template>
    <slot v-if="process.mounted"></slot>
</template>
