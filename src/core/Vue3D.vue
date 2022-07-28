<template>
  <canvas :id="id" ref="canvas" :width="width" :height="height">
    <slot v-if="process.mounted"></slot>
    Sorry, your web browser does not support {{ mode }}
  </canvas>
</template>

<script>
import * as THREE from "three";
import {ref, reactive, computed, inject, provide, watch, markRaw, onMounted,} from "vue";
import {nanoid} from "nanoid";
import {useEventHandler} from "./event";
import {useDelegation} from '../composition/delegation'
import {ev} from "../const/event";
import ScenesManager from "../library/ScenesManager";

export default {
  name: "Vue3d",
  props: {
    id: { // 唯一ID
      type: String,
      default() {
        return nanoid(8)
      }
    },
    conf: { // render 配置文件
      type: Object,
      default() {
        return {
          alpha: true, // 开启背景透明
          antialias: true, // 是否抗锯齿
          preserveDrawingBuffer: true, // 是否保留渲染缓存
        }
      }
    },
    mode: {type: String, default: 'webgl'}, // 渲染模式
    width: {type: Number, required: true}, // 显示宽度
    height: {type: Number, required: true}, // 显示高度
    ratio: {type: Number, default: 1}, // 像素比例
    auto: {type: Boolean, default: false}, // 开启自动渲染
    pause: {type: Boolean, default: false}, // 暂停渲染
    clearColor: {type: String, default: 'rgb(0,0,0)'}, // 背景颜色
    clearAlpha: {type: Number, default: 1}, // 背景透明度
  },
  setup(props, context) {
    const vue3d = inject('vue3d')
    const canvas = ref(null) // dom
    const process = reactive({
      mounted: false, // 挂载完成
      loaded: false, // 加载完成
    })

    const scenesManager = new ScenesManager(props.id)

    const handler = markRaw({
      id: props.id,
      scene: scenesManager.root, // 场景
      camera: null, // 摄像机组
    })

    const delegation = useDelegation() // 委托
    const {on, off, emit, all} = useEventHandler(props.id) // 事件器

    let rendering = null // 渲染进程

    /** 渲染一帧 **/
    const render = () => {
      if (rendering || props.pause) return;
      if (!handler.scene || !handler.camera) return;
      rendering = requestAnimationFrame(() => {
        delegation.call(this); // 调用委托中的方法
        handler.renderer.render(handler.scene, handler.camera);
        handler.camera.updateProjectionMatrix()
        rendering = null; // 当前帧渲染完成，释放
        emit(ev.renderer.rendered.handler) // 渲染完成后触发

        if (props.auto) {
          render();
        }
      })
    }

    // 监听尺寸变化
    watch([() => props.width, () => props.height], () => {
      if (!process.mounted) return
      handler.renderer.setSize(props.width, props.height);
    })
    // 监听背景变化
    watch([() => props.clearColor, () => props.clearAlpha], () => {
      if (!process.mounted) return
      handler.renderer.setClearColor(new THREE.Color(props.clearColor).getHex(), props.clearAlpha);
    })

    onMounted(() => {

      switch (props.mode.toLowerCase()) {
        case 'webgl':
        default:
          handler.renderer = new THREE.WebGLRenderer({canvas: canvas.value, ...props.conf});
          handler.renderer.setClearColor(new THREE.Color(props.clearColor).getHex(), props.clearAlpha);
          handler.renderer.setPixelRatio(props.ratio)
      }

      vue3d.add(props.id, handler)
      vue3d.setActivated(props.id)

      // 加载完成
      process.mounted = true

      emit(ev.renderer.created.handler)
      on(ev.renderer.render.handler, render)

      render()
    })
    // Canvas DOM
    provide('canvas', computed(() => {
      return canvas.value
    }))
    provide('handler', handler) // Base Component Handler
    provide('render', render)
    provide('scenesManager', scenesManager) // Scenes Manager
    provide('parent', {node: scenesManager.root}) // Current Node
    provide('width', computed(() => {
      return props.width
    }))
    provide('height', computed(() => {
      return props.height
    }))

    return {vue3d, canvas, process, render, scenesManager}
  },
  unmounted() {
    this.vue3d.setActivated(null)
  }
}
</script>