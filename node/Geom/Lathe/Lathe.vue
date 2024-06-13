<script setup>
import {inject, reactive, toRaw, watch} from "vue";
import {LatheGeometry, Mesh} from 'three'
import {object3dEmits, object3dProps, useObject3d} from "../../../mixins/useObject3D";
import {nodeEmits, nodeProps, useNode} from "../../../mixins/useNode";
import {materialEmits, materialProps, useMaterial} from "../../../use"
import Box3 from "../../../libs/Box3.class";
import {LatheGeom, LatheName} from "./index"

const props = defineProps({
  ...nodeProps,
  ...object3dProps,
  ...materialProps,
  points: {type: Array},// Vector2 对象数组
  segments: {type: Number, default: 12}, // 要生成的车削几何体圆周分段的数量，默认值是12。
  phiStart: {type: Number, default: 0}, // 以弧度表示的起始角度，默认值为0。
  phiLength: {type: Number, default: Math.PI * 2}, // 车削部分的弧度（0-2PI）范围，2PI将是一个完全闭合的、完整的车削几何体，小于2PI是部分的车削。默认值是2PI。
  withHelper: {type: Boolean, default: false},
  adapted: {type: Boolean, default: false},
})

const emits = defineEmits([
  ...nodeEmits,
  ...object3dEmits,
  ...materialEmits
])

const stage = inject("stage")
const parent = inject("parent")

const object3d = reactive(new LatheGeom())
const {status} = useNode(object3d, props, emits, LatheName)
const {setScale} = useObject3d(object3d, props, emits)
let mesh = null

watch(() => props.points, (val) => {
  if (props.points.length < 5) return
  if (mesh) object3d.remove(mesh)
  const geometry = new LatheGeometry(toRaw(props.points), props.segments, props.phiStart, props.phiLength)
  mesh = new Mesh(geometry)

  object3d.add(mesh)
  useMaterial(mesh, props, emits)
  // 自适应调整模型
  if (props.adapted) {
    const box3 = new Box3(mesh)
    // 通过包装盒重新规划中心点
    geometry.computeBoundingBox()
    geometry.center()
    // 将中心点Y轴修正到底部，方便对齐其他模型
    geometry.translate(0, box3.size.y / 2, 0);
    // 缩放到屏幕比例
    let scale = box3.getContainedScale()
    setScale(scale)
  }
  // 渲染
  stage.render()

}, {deep: true})

</script>

<template>
  <slot v-if="status.mounted"></slot>
</template>
