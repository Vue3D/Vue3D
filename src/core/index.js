import aggregation from 'aggregation/es6' // 模拟多重继承
import {EventBus} from '@unjuanable/jokes/classes'
import {ev} from "../const/event";
import {noop} from "@unjuanable/jokes";

// 默认配置文件
const _defaultOptions = {
    dataEngine: null
}

/** @class Vue3d - 三维渲染组件库 **/
class Vue3d extends aggregation(EventBus) {
    options

    /**
     *
     * @param options
     */
    constructor(options = {}) {
        options = Object.assign(_defaultOptions, options)
        super(options)
        this.options = options
    }

    render(callback = noop, uuid = null) {
        this.emit(ev.renderer.render.handler, null, uuid)
        if (callback && typeof callback === 'function') {
            callback()
        }
    }
}


export default Vue3d
