import aggregation from 'aggregation/es6' // 模拟多重继承
import * as Three from 'three'

import event, {ev} from './event' // 事件类

// 配置文件
const _defaultOptions = {
    aligningGuidelines: true,
    centeringGuidelines: true,
}

let _scenes = {} // 所有场景集合

class Vue3D extends aggregation(event) {

    constructor(options = {}) {
        super()
        this.options = Object.assign({}, _defaultOptions, options)
        this.activatedSceneUUID = null
    }

}