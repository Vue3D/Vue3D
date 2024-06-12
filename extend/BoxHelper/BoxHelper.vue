<script setup>
import {inject, toRaw, watch} from "vue";
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

const emits = defineEmits(["update:target"])

const stage = inject('stage')

const box = new Box3();
const helper = new Box3Helper(box, new Color(props.color).getHex())

const {mount} = useExtend(helper, props, emits, BoxHelperName)

helper.updateMatrixWorld(true)
helper.visible = false

mount()

const setTarget = (target, callback = noop) => {
  if (!target) {
    helper.visible = false
    return
  }
  helper.visible = true
  // 绑定BoxHelper
  if (target && target.hasOwnProperty("isVue3d") && target.isVue3d) {
    box.setFromObject(target)
    stage.render(callback);
  } else {
    setTarget(target.parent)
  }
}

watch(() => props.target, (val, oldVal) => {
  if (val === oldVal) return
  if (oldVal) {
    oldVal.remove(box)
  }
  setTarget(toRaw(val))
}, {deep: false})

</script>

<template></template>
