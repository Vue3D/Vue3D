<script setup>
import {inject, onMounted, toRaw, watch} from "vue";
import {Box3, Box3Helper, Color} from 'three'
import {noop} from "@unjuanable/jokes";
import {extendProps, useExtend} from "../../mixins/useExtend";
import {BoxHelperName} from "./";

const props = defineProps({
  target: {
    type: [Object, null], validator(value) {
      if (!value) return true
      return value.isObject3D ?? false
    },
  },
  color: {type: String, default: 'rgb(255,255,0)'},
  ...extendProps
})

const emits = defineEmits([
  "update:target"
])

const stage = inject('stage')

const box = new Box3();
const helper = new Box3Helper(box, new Color(props.color).getHex())

const {extend} = useExtend(helper, props, emits, BoxHelperName)

helper.visible = false

const setTarget = (target, callback = noop) => {
  if (!target) {
    helper.visible = false
    return
  }
  // 绑定BoxHelper
  if (target && target.hasOwnProperty("isVue3d") && target.isVue3d) {
    helper.visible = true
    box.setFromObject(target)
    stage.render(callback);
  } else {
    setTarget(target.parent)
  }
  emits("update:target", target)
}

onMounted(() => {
  extend.add()
})

watch(() => props.target, (val, oldVal) => {
  if (val === oldVal) return
  if (oldVal) {
    // oldVal.remove(box)
  }
  setTarget(toRaw(val))
}, {deep: true})

defineExpose({setTarget})
</script>

<template></template>
