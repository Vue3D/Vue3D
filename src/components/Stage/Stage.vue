<script setup>
import {computed, markRaw, onMounted, provide, ref, watch} from "vue";
import {ACESFilmicToneMapping, Color, WebGLRenderer} from "three";
import {nanoid} from "nanoid";
import {noop} from "@unjuanable/jokes";
import {ev} from "../../const/event";
import {Node, TYPE} from "../../classes/node.class"
import {useEvent} from "./Event";
import {useScenesManager} from "./useScenesManager";

const emits = defineEmits(['updated'])
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

const canvas = ref(null) // 获取 Canvas DOM

const {process, event} = useEvent(props.uuid)

const stage = markRaw({
  uuid: props.uuid,
  dom: null, // 记录 Canvas DOM
  scenes: useScenesManager(), // 场景管理器
  renderer: null, // 渲染器
})

const {scene, camera} = stage.scenes.getBase()

/**
 * 渲染一帧
 * @param callback
 */
const render = (callback = noop) => {
  if (process.rendering || props.pause) return;
  const {scene, camera} = stage.scenes.getActivated()
  if (!camera?.isCamera) return
  process.rendering = requestAnimationFrame(() => {
    stage.renderer.render(scene, camera);
    camera.updateProjectionMatrix()
    process.rendering = null; // 当前帧渲染完成，释放
    if (typeof callback === "function") callback()
    if (props.auto) {
      render();
    }
  })
}


onMounted(() => {
  stage.dom = canvas.value
  switch (props.mode.toLowerCase()) {
    case 'webgl':
    default:
      stage.renderer = new WebGLRenderer({canvas: canvas.value, ...props.conf});
      stage.renderer.setClearColor(new Color(props.clearColor).getHex(), props.clearAlpha);
      stage.renderer.setPixelRatio(props.ratio)
      stage.renderer.toneMapping = ACESFilmicToneMapping;
  }

  if (props.dataEngine) {
    stage.dom.setAttribute('data-engine', props.dataEngine)
  } else {
    stage.dom.removeAttribute('data-engine')
  }

  // 加载完成
  process.mounted = true

  // Command
  event.on(ev.stage.command.render, render)

  render()
})

// 监听尺寸变化
watch([() => props.width, () => props.height], () => {
  if (!process.mounted) return
  stage.renderer.setSize(props.width, props.height);
  emits('updated')
})
// 监听背景变化
watch([() => props.clearColor, () => props.clearAlpha], () => {
  if (!process.mounted) return
  stage.renderer.setClearColor(new Color(props.clearColor).getHex(), props.clearAlpha);
  emits('updated')
})

/** Expose **/
defineExpose({expose: stage, event, render})

provide('stage', stage)
provide('parent', new Node(scene, TYPE.STAGE, props.uuid))
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

