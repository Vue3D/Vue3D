import {reactive} from "vue";
import {compose} from "@unjuanable/jokes"
import {nanoid} from "nanoid";

/**
 * 对象生命周期
 * @param node
 * @param props
 * @param emits
 */
export function useLifecycle(node, props, emits) {
    const status = reactive({
        loading: false,
        mounted: false,
        unmount: false,
        update: false
    })

    // 更新委托方法组
    const _updateMiddlewares = [(next) => {
        emits("onBeforeUpdate")
        status.update = true
        next()
        status.update = false
        emits("onAfterUpdated")
    }]

    // 加载委托方法组
    const _loadingMiddlewares = [(next) => {
        emits("onLoading")
        status.loading = true
        next()
        status.loading = false
        emits("onLoaded")
    }]

    /**
     * 挂载完成
     */
    const onMounted = () => {
        status.mounted = true
        emits("onMounted")
    }

    /**
     * 卸载完成
     */
    const onUnmounted = () => {
        status.unmount = true
        emits("onUnmount")
    }

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

    return {status, uuid: props.uuid, onMounted, onUnmounted, onUpdate, onLoading}
}

/**
 * 配置文件
 */
export const inLifecycle = {
    emits: ["onLoading", "onLoaded", "onMounted", "onBeforeUpdate", "onAfterUpdated", "onUnmount"],
    props: {
        uuid: {
            type: [String, Number], default() {
                return nanoid(8)
            }
        },
    }
}
