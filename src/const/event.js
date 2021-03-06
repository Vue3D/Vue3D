// Event Handler
export const ev = {
    renderer: { // 渲染器
        created: {handler: '{uuid}:renderer:created'}, // 创建渲染器
        destroy: {handler: '{uuid}:renderer::destroy'}, // 销毁渲染器
        activate: {handler: '{uuid}:renderer::activate'}, // 选中并激活渲染器
        free: {handler: '{uuid}:renderer:free'}, // 释放激活的渲染器
        render: {handler: '{uuid}:renderer:render'}, // 渲染一帧
        rendered: {handler: '{uuid}:renderer:rendered'}, // 渲染完成
    },
}