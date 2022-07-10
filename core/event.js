import mitt from 'mitt';
import {nanoid} from 'nanoid';

const emitter = mitt();

/**
 * Event Bus
 */
class event {
    activatedSceneUUID = null; // 继承主类变量，尽量不要赋值

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
            uuid = this.activatedSceneUUID
        }
        let activatedStage = type.replace('{uuid}', nanoid())
        this.emit(activatedStage, event)
    }
}

export default event

// Event Handler
export const ev = {
    scene: { // 场景
        created: {id: 'S001', handler: 'stage:created'}, // 创建舞台
        destroy: {id: 'S002', handler: 'stage:destroy'}, // 销毁舞台
        activate: {id: 'S003', handler: 'stage:activate'}, // 选中并激活舞台
        free: {id: 'S004', handler: 'stage:free'}, // 释放激活的舞台
    },
    fire: { // 通过UUID选择特定场景的事件,一般在scene组件中监听
        clear: {id: 'F001', handler: '{uuid}:clear'}, // 清空当前舞台中所有内容
        resize: {id: 'F002', handler: '{uuid}:resize'}, // 重新调整舞台大小
        scaled: {id: 'F003', handler: '{uuid}:scaled'}, // 缩放舞台显示尺寸
        export: {id: 'F004', handler: '{uuid}:export'}, // 导出专用格式
        exportSvg: {id: 'F005', handler: '{uuid}:exportSVG'}, // 导出SVG格式
        exportPng: {id: 'F006', handler: '{uuid}:exportPNG'}, // 导出PNG格式
        drawable: {id: 'F007', handler: '{uuid}:drawable'}, // 激活绘制模式
        brush: {id: 'F008', handler: '{uuid}:brush'}, // 激活笔刷模式
    },
    object: { // 三维对象
        added: {id: '001', handler: 'object:added'}, // 添加图层
        removed: {id: '002', handler: 'object:removed'}, // 删除图层
        selected: {id: '003', handler: 'object:selected'}, // 选中图层
        free: {id: '004', handler: 'object:free'}, // 释放选中
    }
}
