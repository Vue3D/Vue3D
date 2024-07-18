import {nextTick, onBeforeUnmount, onMounted, reactive} from "vue";
import {compose} from "@unjuanable/jokes"

const lifecycleEmits = () => {
    return ["onLoading", "onLoaded", "onMounted", "onBeforeUpdate", "onAfterUpdated", "onUnmount"]
}
const lifecycleProps = {}

/**
 * 对象生命周期
 * @param node
 * @param props
 * @param emits
 */
function useLifecycle(node, props, emits) {
    const status = reactive({
        loading: false,
        mounted: false,
        unmount: false,
        update: false
    })

    /**
     * 挂载完成
     */
    onMounted(async () => {
        await nextTick()
        status.mounted = true
        emits("onMounted")
    })

    /**
     * 卸载完成
     */
    onBeforeUnmount(async () => {
        await nextTick()
        status.unmount = true
        emits("onUnmount")
    })

    /**
     * 监听加载事件
     * @param func
     * @returns {Promise<void>}
     */
    const onLoading = async (...func) => {
        for (let f of func) {
            if (typeof f === "function") {
                _loadingMiddlewares.push(f)
            }
        }
        if (status.loading) return
        let fn = compose(_loadingMiddlewares)
        await fn()
    }

    // 加载委托方法组
    const _loadingMiddlewares = [(next) => {
        emits("onLoading")
        status.loading = true
        next()
        status.loading = false
        emits("onLoaded")
    }]

    /**
     * 更新
     * @returns {Promise<void>}
     */
    const onUpdate = async (...func) => {
        for (let f of func) {
            if (typeof f === "function") {
                _updateMiddlewares.push(f)
            }
        }
        if (status.update) return
        let fn = compose(_updateMiddlewares)
        await fn()
    }

    // 更新委托方法组
    const _updateMiddlewares = [(next) => {
        emits("onBeforeUpdate")
        status.update = true
        next()
        status.update = false
        emits("onAfterUpdated")
    }]

    return {status, onLoading, onUpdate}
}

export {lifecycleProps, lifecycleEmits, useLifecycle}
