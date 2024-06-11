import {nextTick, onMounted, ref, watch} from "vue";
import {ACESFilmicToneMapping, Color, WebGLRenderer} from "three";
import {compose, noop} from "@unjuanable/jokes";

export const rendererEmits = ["rendering", "rendered"]
export const rendererProps = {
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

/**
 * 渲染器
 * @param canvas
 * @param props
 * @param emits
 * @returns
 */
export function useRenderer(canvas, props, emits) {
    let renderer = null // 渲染器
    let node = null
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
     * 绑定节点
     * @param n
     */
    const bindNode = (n) => {
        node = n
    }

    /**
     * 添加渲染中间件
     * @param func
     */
    const renderCall = (...func) => {
        for (let f of func) {
            if (typeof f === "function") {
                _renderMiddleware.push(f)
            }
        }
    }

    /**
     * 渲染一帧
     * @param callback {function?}
     */
    const render = (callback = noop()) => {
        if (!node || !node?.scene?.isScene || !node?.mainCamera?.isCamera) return
        if (!renderer || !!rendering.value || props.pause) return
        rendering.value = requestAnimationFrame(async () => {
            const fn = compose(_renderMiddleware)
            renderer.render(node.scene, node.mainCamera);
            node.mainCamera.updateProjectionMatrix()
            await fn()
            callback && typeof callback === "function" && callback()
            rendering.value = 0; // 当前帧渲染完成，释放
            if (props.auto) {
                render();
            }
        })
    }


    /**
     * 渲染中间件
     * @type {((function(*): void)|*)[]}
     * @private
     */
    const _renderMiddleware = [(next) => {
        emits("rendering")
        next()
        emits("rendered")
    }]

    return {renderer, bindNode, renderCall, render}
}


