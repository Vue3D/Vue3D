import aggregation from 'aggregation/es6' // 模拟多重继承

import event from './event' // 事件类

// 配置文件
const _defaultOptions = {}

const _store = {}

export default class extends aggregation(event) {

    constructor(options = {}) {
        super()
        this.options = Object.assign({}, _defaultOptions, options)
        this.activatedUUID = null // 当前激活的ID
    }

    /**
     * 获取数据
     * @param id
     * @returns {{}|null|*}
     */
    get(id = null) {
        if (!id) {
            id = this.activatedUUID
        }
        if (_store.hasOwnProperty(id)) {
            return _store[id]
        }
        return null
    }

    /**
     * 获取全部数据
     * @returns {{}}
     */
    all() {
        return _store
    }

    /**
     * 添加数据
     * @param uuid
     * @param data
     */
    add(uuid, data) {
        _store[uuid] = data
    }

    /**
     * 激活挂载数据对象
     * @param uuid
     */
    setActive(uuid = null) {
        if (uuid === null) {
            this.activatedUUID = null
            return true
        } else if (_store.hasOwnProperty(uuid)) {
            this.activatedUUID = uuid
            return true
        } else {
            return false
        }
    }

}