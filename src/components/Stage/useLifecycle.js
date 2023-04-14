import {inject, reactive} from "vue";
import {ev} from '../../const/event.js'

/**
 * 舞台生命周期事件
 * @param uuid
 * @returns {{loading: boolean, mounted: boolean}}
 */
export default function useLifecycle(uuid) {
    const $vue3d = inject('$vue3d')
    const process = reactive({
        mounted: false,
        loading: true,
        rendering: null,
    })

    // 开始加载
    $vue3d.on(ev.renderer.loading.handler, () => {
        process.loading = true
    }, uuid)

    // 加载完成
    $vue3d.on(ev.renderer.loaded.handler, () => {
        process.loading = false
    }, uuid)

    return process
}
