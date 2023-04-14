<template>
    <canvas :id="id" ref="canvas" :width="width" :height="height">
        <slot v-if="process.mounted"></slot>
        Sorry, your web browser does not support {{ mode }}
    </canvas>
</template>

<script>
import {Color, WebGLRenderer} from "three";
import {computed, inject, markRaw, onMounted, onUnmounted, provide, reactive, ref, watch,} from "vue";
import {nanoid} from "nanoid";
import useDelegation from './useDelegation';
import useSceneManager from "./useSceneManager";
import useLifecycle from "./useLifecycle";
import {ev} from "../../const/event";
import {noop} from "@unjuanable/jokes";

export default {
    name: "Stage",
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
        active: {type: Boolean, default: false}, // 默认激活
        dataEngine: {type: String, default: null}, // Canvas Dom data-engine attribute
    },
    emits: ['updated'],
    setup(props, ctx) {
        const $vue3d = inject('$vue3d')

        const canvas = ref(null) // 获取 Canvas DOM

        const process = useLifecycle(props.id)
        const delegation = useDelegation() // 委托

        const data = markRaw({
            id: props.id,
            dom: null, // 记录 Canvas DOM
            scenesManager: useSceneManager(props.id), // 场景管理器
            scene: null, // 当前场景
            camera: null, // 当前摄像机
            renderer: null, // 渲染器
            render: noop,
            delegation
        })

        /**
         * 渲染
         */
        const render = (callback = noop) => {
            if (process.rendering || props.pause) return;
            if (!data.scene || !data.camera) return;
            process.rendering = requestAnimationFrame(() => {
                delegation.call(data); // 调用委托中的方法
                data.renderer.render(data.scene, data.camera);
                data.camera.updateProjectionMatrix()
                process.rendering = null; // 当前帧渲染完成，释放
                if (typeof callback === "function") callback()
                $vue3d.emit(ev.renderer.rendered.handler, null, props.id) // 渲染完成后触发
                if (props.auto) {
                    render();
                }
            })
        }

        // 监听尺寸变化
        watch([() => props.width, () => props.height], () => {
            if (!process.mounted) return
            data.renderer.setSize(props.width, props.height);
            ctx.emit('updated')
        })
        // 监听背景变化
        watch([() => props.clearColor, () => props.clearAlpha], () => {
            if (!process.mounted) return
            data.renderer.setClearColor(new Color(props.clearColor).getHex(), props.clearAlpha);
            ctx.emit('updated')
        })

        onMounted(() => {
            data.dom = canvas.value // 获取Dom对象
            data.scene = data.scenesManager.getActive()
            switch (props.mode.toLowerCase()) {
                case 'webgl':
                default:
                    data.renderer = new WebGLRenderer({canvas: data.dom, ...props.conf});
                    data.renderer.setClearColor(new Color(props.clearColor).getHex(), props.clearAlpha);
                    data.renderer.setPixelRatio(props.ratio)
            }

            if (props.dataEngine) {
                data.dom.setAttribute('data-engine', props.dataEngine)
            } else {
                data.dom.removeAttribute('data-engine')
            }

            /** 创建事件对象 **/
            $vue3d.createPool(props.id, data) && $vue3d.emit(ev.renderer.created.handler)

            props.active && $vue3d.setActive(props.id, () => {
                $vue3d.emit(ev.renderer.activate.handler)
            })

            // 加载完成
            process.mounted = true

            $vue3d.on(ev.renderer.render.handler, render, props.id)
            data.render = render
            render()
        })

        onUnmounted(() => {
            $vue3d.removePool(props.id) && $vue3d.emit(ev.renderer.destroy.handler)
        })

        provide('stage', data)
        provide('parent', {node: data.scenesManager.getActive()}) // Current Node
        provide('width', computed(() => {
            return props.width
        }))
        provide('height', computed(() => {
            return props.height
        }))

        return {canvas, process, delegation, data, render}
    },
}
</script>
