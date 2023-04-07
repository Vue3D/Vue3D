import {reactive} from "vue";
import {noop} from "@unjuanable/jokes";

export default function useLifecycle() {
    const process = reactive({
        mounted: false, // 挂载完成
        loaded: false, // 加载完成
    })

    const vMounted = (callback = noop) => {
        process.mounted = true
        callback && callback()
    }

    const vLoaded = (callback = noop) => {
        process.loaded = true
        callback && callback()
    }

    const vUnmount = (callback = noop) => {
        process.mounted = false
        callback && callback()
    }

    return {process, vMounted, vUnmount, vLoaded}
}

