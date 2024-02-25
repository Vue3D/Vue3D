import {reactive, watch} from "vue";
import mitt from "mitt"

export function useEvent(uuid) {
    const process = reactive({
        mounted: false,
        loading: true,
        rendering: 0,
    })

    const event = mitt()

    watch(() => process.mounted, (val) => {
        if (val) {
            event.emit(ev.mounted)
        }
    })

    // 加载资源
    watch(() => process.loading, (val) => {
        if (val) {
            event.emit(ev.loading)
        } else {
            event.emit(ev.loaded)
        }
    })

    // 渲染场景
    watch(() => process.rendering, (val) => {
        if (!!val) {
            event.emit(ev.rendering)
        } else {
            event.emit(ev.rendered)
        }
    })

    return {process, event}
}

export const ev = {
    mounted: "renderer.mounted",
    loading: "renderer.loading",
    loaded: "renderer.loaded",
    rendering: "renderer.rendering",
    rendered: "renderer.rendered"
}
