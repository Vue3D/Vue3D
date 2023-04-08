import {inject} from "vue";
import {ev} from '../const/event.js'

/**
 * 舞台生命周期事件
 * @param uuid
 * @returns {{loading: boolean, mounted: boolean}}
 */
export function useLifecycle(uuid) {
    const v3d = inject('v3d')
    const process = {
        mounted: false,
        loading: true,
        rendering: null,
    }

    // 开始加载
    v3d.on(ev.renderer.loading.handler, () => {
        process.loading = true
    }, uuid)

    // 加载完成
    v3d.on(ev.renderer.loaded.handler, () => {
        process.loading = false
    }, uuid)

    return process
}
