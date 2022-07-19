import mitt from 'mitt';
import {nanoid} from 'nanoid';
import {inject} from 'vue'

const emitter = mitt();

/**
 * Event Bus
 */
export default class event {
    activatedUUID = null; // 继承主类变量，尽量不要赋值

    // Add Listener
    on = (type, handler) => {
        emitter.on(type, e => {
            handler(e, this)
        })
    }
    // Remove Listener
    off = emitter.off
    // Fire Event
    emit = emitter.emit
    // Event List Array
    all = () => {
        return emitter.all
    }
    // Fire Event By UUID
    fire = (type, event, uuid = null) => {
        if (uuid === null) {
            uuid = this.activatedUUID
        }
        let activated = type.replace('{uuid}', uuid)
        this.emit(activated, event)
    }
    // Fire Warn Event
    warn = (event) => {
        this.emit('warn', event)
    }
    // Fire Error Event
    error = (event) => {
        this.emit('error', event)
    }
}

/**
 * 局部事件方法
 * @param uuid
 * @returns {{all: (function(*=): Map<any, any>), emit: emit, off: off, on: on}}
 */
export function useEventHandler(uuid) {
    const vue3d = inject('vue3d')
    const reg = new RegExp("^" + uuid + "\:")

    /**
     * 获取组件内事件类型
     * @param type
     * @returns {string}
     */
    const innerEventType = (type) => {
        return type.replace('{uuid}', uuid);
    }

    /**
     * 添加事件监听器 add event listener
     * @param type
     * @param handler
     */
    const on = (type, handler) => {
        vue3d.on(innerEventType(type), handler)
    }

    /**
     * 移除事件监听器 remove event listener
     * @param type
     * @param handler
     */
    const off = (type, handler) => {
        vue3d.off(innerEventType(type), handler)
    }

    /**
     * 触发事件 Fire event
     * @param type
     * @param opts
     */
    const emit = (type, opts) => {
        vue3d.emit(innerEventType(type), opts)
    }

    /**
     * 列出当前组件所有事件监听器
     * @param showOriginType 是否显示原始名称，当为 false 时不显示 innerHandler
     * @returns {Map<any, any>}
     */
    const all = (showOriginType = false) => {
        const innerEvents = new Map()
        for (let [key, value] of this.$vue3d.all()) {
            if (key.search(reg) === 0) {
                innerEvents.set(showOriginType ? key : key.replace(reg, ''), value)
            }
        }
        return innerEvents
    }

    return {
        on, off, emit, all
    }
}
