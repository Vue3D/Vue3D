import {nanoid} from "nanoid";
import {nextTick, onMounted, ref, watch} from "vue";
import {ACESFilmicToneMapping, Camera, Color, Scene, WebGLRenderer} from "three";
import {compose, noop} from "@unjuanable/jokes";

/**
 * 渲染器
 */
export function useRenderer(canvas, props, emits) {
    let renderer = null // 渲染器
    let scene = null
    let camera = null
    let rendering = ref(0)

    onMounted(async () => {
        await nextTick()
        switch (props.mode.toLowerCase()) {
            case 'webgl':
            default:
                renderer = new WebGLRenderer({canvas: canvas.value, ...props.renderer});
                renderer.setClearColor(new Color(props.clearColor).getHex(), props.clearAlpha);
                renderer.setPixelRatio(props.ratio)
                renderer.toneMapping = ACESFilmicToneMapping;
        }

        // 监听尺寸变化
        watch([() => props.width, () => props.height], () => {
            renderer.setSize(props.width, props.height);
        })
        // 监听背景变化
        watch([() => props.clearColor, () => props.clearAlpha], () => {
            renderer.setClearColor(new Color(props.clearColor).getHex(), props.clearAlpha);
        })
    })

    /**
     * 绑定场景和摄像机
     * @param newScene {Scene}
     * @param newCamera {Camera}
     */
    const bind = (newScene, newCamera) => {
        if (newScene && newScene.isScene && newCamera && newCamera.isCamera) {
            scene = newScene
            camera = newCamera
        }
    }

    // 渲染中间件
    const _renderMiddleware = [(next) => {
        emits("rendering")
        next()
        emits("rendered")
    }]

    /**
     * 添加渲染中间件
     */
    const onRender = (...func) => {
        for (let f of func) {
            if (typeof f === "function") {
                _renderMiddleware.push(f)
            }
        }
    }

    /**
     * 渲染一帧
     */
    const render = (callback = noop()) => {
        if (!scene?.isScene || !camera?.isCamera) return
        if (!renderer || rendering.value || props.pause) return
        rendering.value = requestAnimationFrame(async () => {
            const fn = compose(_renderMiddleware)
            renderer.render(scene, camera);
            camera.updateProjectionMatrix()
            await fn()
            callback && callback()
            rendering.value = 0; // 当前帧渲染完成，释放
            if (props.auto) {
                render();
            }
        })
    }

    return {renderer, bind, render, onRender, onMounted}
}

export const rendererEmits = ["rendering", "rendered"]
export const rendererProps = {
    uuid: {
        type: [String, Number], default() {
            return nanoid(8)
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
    // 渲染器配置文件
    renderer: {
        type: Object,
        default() {
            return {
                alpha: true, // 开启背景透明
                antialias: true, // 是否抗锯齿
                preserveDrawingBuffer: true, // 是否保留渲染缓存
            }
        }
    },
}
