<script setup>
import {computed, markRaw, onMounted, provide, ref, watch} from "vue";
import {ACESFilmicToneMapping, Color, Scene, WebGLRenderer} from "three";
import {nanoid} from "nanoid";
import {noop} from "@unjuanable/jokes";
import {useSceneManager} from "../common/SceneManager";
import {useEvent} from "../common/Event";
import {ev} from "../../const/event";

import {useTransform} from "../../core/transform";
import {useVue3D} from "../../core";

useVue3D(useTransform)
const props = defineProps({
  uuid: {
    type: [String, Number], default() {
      return nanoid(8)
    }
  },
  // 渲染器配置文件
  conf: {
    type: Object,
    default() {
      return {
        alpha: true, // 开启背景透明
        antialias: true, // 是否抗锯齿
        preserveDrawingBuffer: true, // 是否保留渲染缓存
      }
    }
  },
  // 渲染模式
  mode: {
    type: String, default: 'webgl', validator(value) {
      return ['webgl'].includes(value)
    }
  },
  width: {type: Number, required: true}, // 显示宽度
  height: {type: Number, required: true}, // 显示高度
  ratio: {type: Number, default: 1}, // 像素比例
  auto: {type: Boolean, default: false}, // 开启自动渲染
  pause: {type: Boolean, default: false}, // 暂停渲染
  clearColor: {type: String, default: 'rgb(0,0,0)'}, // 背景颜色
  clearAlpha: {type: Number, default: 1}, // 背景透明度
  dataEngine: {type: String, default: null}, // Canvas Dom data-engine attribute
})
const emits = defineEmits(["updated"])
useTransform()
/** DOM **/
const canvas = ref(null) // 获取 Canvas DOM

/** Data **/
const data = markRaw({
  id: props.uuid,
  dom: null, // 记录 Canvas DOM
  scene: null, // 场景管理器
  camera: null, // 当前摄像机
  renderer: null, // 渲染器
  render: noop,
})

/** Lib **/
const {process, event} = useEvent(props.uuid)
const scenes = useSceneManager(props.uuid)
// const cameras = useCameraManager(props.multiView)

/** Main **/

// 渲染
const render = (callback = noop) => {
  if (process.rendering || props.pause) return;
  if (!data.scene || !data.camera) return;
  process.rendering = requestAnimationFrame(() => {
    data.renderer.render(data.scene, data.camera);
    data.camera.updateProjectionMatrix()
    process.rendering = null; // 当前帧渲染完成，释放
    if (typeof callback === "function") callback()
    if (props.auto) {
      render();
    }
  })
}

onMounted(() => {
  data.dom = canvas.value // 获取Dom对象
  data.root = new Scene()
  switch (props.mode.toLowerCase()) {
    case 'webgl':
    default:
      data.renderer = new WebGLRenderer({canvas: data.dom, ...props.conf});
      data.renderer.setClearColor(new Color(props.clearColor).getHex(), props.clearAlpha);
      data.renderer.setPixelRatio(props.ratio)
      data.renderer.toneMapping = ACESFilmicToneMapping;
  }

  if (props.dataEngine) {
    data.dom.setAttribute('data-engine', props.dataEngine)
  } else {
    data.dom.removeAttribute('data-engine')
  }

  // 加载完成
  process.mounted = true

  event.on(ev.renderer.render.handler, render)

  render()
})

// 监听尺寸变化
watch([() => props.width, () => props.height], () => {
  if (!process.mounted) return
  data.renderer.setSize(props.width, props.height);
  emits('updated')
})
// 监听背景变化
watch([() => props.clearColor, () => props.clearAlpha], () => {
  if (!process.mounted) return
  data.renderer.setClearColor(new Color(props.clearColor).getHex(), props.clearAlpha);
  emits('updated')
})

/** Expose **/
defineExpose({data, event, render})

provide('stage', data)
provide('parent', {node: scenes.root})
provide('event', event)
provide('width', computed(() => {
  return props.width
}))
provide('height', computed(() => {
  return props.height
}))
</script>

<template>
  <canvas :id="uuid" ref="canvas" :width="width" :height="height">
    <slot v-if="process.mounted"></slot>
    Sorry, your web browser does not support {{ mode }}
  </canvas>
</template>

