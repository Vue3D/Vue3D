// Event Handler
export const ev = {
    stage: {
        // 接收的命令
        command: {
            render: 'command:stage:render'
        },
        // 发出的响应
        response: {
            mounted: 'response:stage:mounted',
            loading: 'response:stage:loading',
            loaded: 'response:stage:loaded',
            rendering: 'response:stage:rendering',
            rendered: 'response:stage:rendered'
        },
    },
    renderer: { // 渲染器
        created: {handler: 'renderer:created'}, // 创建渲染器
        destroy: {handler: 'renderer:destroy'}, // 销毁渲染器
        activate: {handler: 'renderer:activate'}, // 选中并激活渲染器
        free: {handler: 'renderer:free'}, // 释放激活的渲染器
        render: {handler: '{uuid}:renderer:render'}, // 发送指令给渲染器，渲染一帧
        rendered: {handler: '{uuid}:renderer:rendered'}, // 当前渲染完成
        loading: {handler: '{uuid}:renderer:loading'}, // 开始加载
        loaded: {handler: '{uuid}:renderer:loaded'}, // 加载完成
    },
    selected: {
        attach: {handler: '{uuid}:selected:attach'}, // 选定
        tfMode: {handler: '{uuid}:selected:tfMode'}, // 切换Transform Control 模式
        tfSpace: {handler: '{uuid}:selected:tfSpace'}, // 切换Transform Control 坐标系
        transform: {handler: '{uuid}:selected:transform'}, // 发生变换
    }
}
