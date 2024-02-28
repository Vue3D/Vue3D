import {reactive, watch} from "vue";
import mitt from "mitt"
import {ev} from '../../const/event'

export function useEvent(uuid) {
    const process = reactive({
        mounted: false,
        loading: true,
        rendering: 0,
    })

    const event = mitt()

    watch(() => process.mounted, (val) => {
        if (val) {
            event.emit(ev.stage.mounted)
        }
    })

    // 加载资源
    watch(() => process.loading, (val) => {
        if (val) {
            event.emit(ev.stage.loading)
        } else {
            event.emit(ev.stage.loaded)
        }
    })

    // 渲染场景
    watch(() => process.rendering, (val) => {
        if (!!val) {
            event.emit(ev.stage.rendering)
        } else {
            event.emit(ev.stage.rendered)
        }
    })

    return {process, event}
}
