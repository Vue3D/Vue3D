<script>
import {inject, reactive, toRaw, watch} from "vue";
import {LatheGeometry, Mesh, Object3D} from 'three'
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
        adapted: {type: Boolean, default: false},
    },
    emits: [...transformEmits, ...materialEmits],
    setup(props, ctx) {
        const stage = inject("stage")
        const object3d = reactive(new Object3D())
        const {process, data} = useObject3d(object3d, props, ctx)
        const {setScale} = useTransform(object3d, props, ctx)
        let mesh = null

        watch(() => props.points, (val) => {
            if (props.points.length < 5) return
            if (mesh) object3d.remove(mesh)
            const geometry = new LatheGeometry(toRaw(props.points), props.segments, props.phiStart, props.phiLength)
            mesh = new Mesh(geometry)
            const box3 = new Box3(mesh)
            geometry.computeBoundingBox()
            geometry.center()
            geometry.translate(0, box3.center.y / 2, 0);
            console.log(box3)
            object3d.add(mesh)
            useMaterial(mesh, props)

            // geometry.applyMatrix4(new Matrix4().makeTranslation(3, 3, 3))
            geometry.translate(3, 3, 3)

            console.log(geometry)

            if (props.adapted) {

                let scale = box3.getContainedScale()
                console.log(scale)
                setScale(scale)
                stage.render()
            }

        }, {deep: true})

        return {process, data}
    },
}
</script>

<template>
    <slot v-if="process.mounted"></slot>
</template>
